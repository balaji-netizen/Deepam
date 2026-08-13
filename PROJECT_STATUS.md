# Dheepam — Project Status

**Updated:** 2026-08-13 · **Build:** green (`tsc --noEmit` clean, `npm run build`
passes) · **Repo root:** `Dheepam Website\` · **Deploy:** Vercel-ready, not yet pushed

> **Latest — the homepage's content CTAs are the shadcn shiny button, re-skinned
> onto the Dheepam gold pill.** New component at
> `src/components/shadcn-space/button/button-02.{tsx,css}`, applied to **Explore
> the Lamp Lighting Guide**, **Explore Festival Customs** and the closing band's
> **Shop on Kaleesuwari**. Same 44px pill, same 14px Figtree, no black outline —
> the once-per-hover highlight is replaced by an ambient reflection that crosses
> **left → right** every 4.6s (1.2s of travel, 3.4s still). **The one decision
> that matters is that the reflection paints *behind* the label, not over it:**
> over the text the shipped alpha would drop the label to **3.14:1**; behind it
> the label goes **7.81:1 at rest and 11.06:1 at the reflection's centre** — it
> can never fall. **Shop Now (×2) and the Neivedhyam CTA are untouched** by
> brief, and so are all four inner pages — `Footer` takes `currentPage` so the
> closing band keeps its old pill off the homepage. See §Home page shiny CTA
> (latest).
>
> Before that: **the navigation bar was invisible and unclickable on the homepage,
> and the cause was one missing space.** `Navbar.tsx` wrote
> `` `…z-50${overHero ? ' nav-over-hero' : ''}` `` — with `z-50` glued to the
> interpolation, **Tailwind's scanner never extracted it**, `.z-50` was never
> emitted, and the fixed bar fell back to `z-index: auto`. The hero section comes
> later in tree order and is positioned, so **it painted straight over the whole
> bar**: `elementFromPoint` at every single menu item returned
> `div.shell-hero.hero-frame`, not the link. The menu was in the DOM, styled
> correctly, and completely unreachable. Fixed by restoring the space so Tailwind
> sees the class. **`.fixed`, `.top-0`, `.left-0` and `.right-0` from the same
> string all worked**, which is exactly why it read as "the menu vanished" rather
> than "the bar is unstyled". See §Navigation restored (latest).
>
> Before that: deployment prep for GitHub + Vercel. No UI, content, styling or
> motion changed.** `Dheepam Website\` is now the repository root: `CLAUDE.md` and
> `PROJECT_STATUS.md` moved into it, the parent keeps a pointer. **The find that
> mattered: the Figma Make scaffold's `.gitattributes` routed every `*.png`,
> `*.webp` and `*.mp4` through Git LFS.** Vercel clones without fetching LFS
> objects, so the build would have bundled ~130-byte pointer files as images and
> shipped a site with every photograph broken — behind a green build log. LFS is
> gone. Also: the stale `pnpm-lock.yaml` removed (it outranks `package-lock.json`
> in Vercel's package-manager detection), `<title>` was literally
> **"Figma Make App"** and `robots.txt` was **`Disallow: /`** — both fixed, a
> favicon added, `vercel.json` written, and the two builder scripts that hard-coded
> `D:\Balaji\...` de-absolutised. See §Deployment prep — GitHub + Vercel (latest).
>
> Before that: **CTA shine, 16px prose, and a slider arrow that was never
> clickable.** The gold pill **loses its dark rim** and gains a soft **left→right
> shine on hover** (`::before`, 0.85s, off under reduced motion). **Shop Now** and
> the **Neivedhyam CTA** are back to `variant="line"` by brief, which is also what
> lets the Neivedhyam CTA sit **exactly on the paragraph's left rail** — and it
> retired the stacked 992–1199.98 row. All homepage prose is **16px Figtree**. The
> chakra turns **180s** instead of 240. And the real find: **`.nv-track`'s
> `will-change: transform` made a stacking context that covered the control row**,
> so the *next* arrow hit-tested to `.nv-grid` and did not respond to a real
> click — `.nv-controls` is positioned now. See §CTA shine, 16px prose & the
> unclickable arrow (latest).
>
> Before that: the twelve-point home page consolidation. The **nav star is gone**
> (the underline is the whole hover language now). The secondary face is
> **Figtree** throughout, swapped at two tokens. **Every CTA on the page is one
> gold pill** — 44px, 999px corner, 14px, rim'd because the gold fill is only
> 2.38:1 on ivory — including `Contact Us`, both `Shop Now` tiles and the closing
> band. The Lamp Lighting plate is now the supplied **`Lamp Lighting Guide.mp4`**
> (4:5, autoplaying muted, with a pause chip and a reduced-motion opt-out). The
> Neivedhyam slider carries the **five named dishes on local plates** — Paal
> Payasam, Boondi Laddu, Puliyodarai, Sakkarai Pongal, Kesari Bath — with the
> counter and **round gold arrows grouped with the CTA on the right**. Homepage
> images take **16px / 8px corners**, the hero deliberately excepted. See §Home
> page consolidated update (latest).
>
> Before that: the header **dissolves into the banner** on the homepage — no ivory
> surface, no hairline, light type over a gradient scrim that reaches zero 96px
> below the bar. The scrim is what makes it legal: the product cartons rise into
> the bar above ~1600px, where bare ivory type measured 1.05:1. Worst pixel under
> the links is now **8.24:1**; the active link goes **gold** there because maroon
> is 1.73:1 on the banner. See §Banner + navigation blending.
>
> Before that: the Neivedhyam slider's first offering is **Rava Pongal** (new
> photograph, new category / title / description / note), the **plate and the copy
> column are top-aligned**, and the control row is **split — CTA on the copy
> column's left edge, `01 / 05` + arrows on the content rail**. The section is
> shorter or level at all ten widths. See §Neivedhyam: Rava Pongal, top-aligned
> plate & split control row (latest).
>
> Before that: the Neivedhyam **control row moved into the copy column** — CTA +
> `01 / 05` + arrows under the description on the content rail. See §Neivedhyam
> control row → the copy column.
>
> Before that: homepage imagery, nav and footer — the **Our Story** and
> **Agarbatti** plates swapped to the supplied artwork (Agarbatti becomes a
> *scene* tile, so both products now pair), a real **Diwali** photograph on the
> festival card, the **active nav link in brand maroon**, **Contact Us as a CTA
> button**, the Neivedhyam **CTA joined to the counter and arrows as one
> right-side group**, and the **footer rebuilt to mirror the header menu**.
> See §Imagery, nav CTA, slider group & footer.

Read `CLAUDE.md` first. This file is the live state — update it at the end of a
working session, before `/clear`.

---

## ▶ NEXT TASK

**Push to GitHub and connect Vercel.** Everything is prepared and verified; the
repo is initialised at `Dheepam Website\` with all files staged and **no commit
made yet** — that was left for you deliberately. The navigation fix below is
included in what is staged.

```bash
cd "D:/Balaji/projects/Dheepam/Dheepam Website"
git commit -m "Dheepam microsite — initial commit"
gh repo create dheepam-website --private --source=. --push
```

Then in Vercel: **Add New → Project → import the repo → Deploy.** Every setting
is already pinned in `vercel.json` (framework `vite`, `npm ci`, `npm run build`,
output `dist`), so the detected defaults need no edits. **No environment
variables are required** — the site has no backend, no keys, no analytics.

**Two decisions are waiting for you after the first deploy**, neither blocking:

1. **The site is now indexable** (`robots.index: true`, was `false`). That was
   the answer given this session for a production launch. If this first deploy is
   really a staging URL, flip it back in `.figma/make/site.json` before anyone
   links to it, or Google will index the preview domain.
2. **Eight Unsplash photographs remain hotlinked** across 15 references —
   3 on the homepage's Festivals cards, and the rest on Lamp Lighting (5),
   Festival Customs (5), Contact (1) and Knowledge (1). They will work on Vercel,
   but they are a third-party runtime dependency on pages you own: Unsplash can
   rate-limit, re-crop or remove a photo without notice, and §6 of `CLAUDE.md`
   records that **8 of the 9 originally-shipped Unsplash images were not the
   subject their alt text claimed**. Localising them is the same pipeline the
   dish plates already use.

**One decision this session created, and it is a real one: the homepage gold
pill now has no boundary that meets 3:1.** The brief asked for the black-looking
outline off, and the `#7D620D` rim was exactly that outline — but it was also the
only thing giving the *block* an edge against ivory, where the gold fill measures
2.38:1 (the label was never the problem, 7.81:1). A soft drop shadow replaces it.
That is a legitimate reading of "clean, refined and premium" and it is what was
asked for, but it is a downgrade in non-text contrast, and it should be an
informed choice rather than a silent one. If it needs reverting the value is
`#7D620D` and the rule is `.home-page .cta-gold, .closing .cta-gold, .nav-cta {
border-color: transparent }` in the HOME PAGE block. Unaffected: the inner pages'
three gold buttons, and the slider arrows, which both keep the rim.

**`.closing .lead` was deliberately left at 20px.** The 16px prose rule is scoped
to `.home-page`, and `Footer.tsx` renders the closing band under all five routes —
so pulling its lead to 16 would have changed four inner pages on a homepage-only
brief. It is the one paragraph on the homepage that is not 16px. Say the word and
it is a one-line addition (`.closing .lead`), with the inner pages moving too.

**The one judgement call, and it grew: the trailing space in the Neivedhyam copy
column is now 202px at 1440** (166 before this session — Figtree sets narrower and
the five new descriptions are shorter, so the copy ends higher, and the arrows
came down 6px). The row is anchored to the plate's bottom edge and cannot rise any
higher without the plate spilling out of the section (see §Neivedhyam: Rava
Pongal… for the derivation, and `CLAUDE.md` §8). The composition reads as a footer
band closing the slider on the plate's baseline; if that space is unwanted, the
only two levers are still **the plate's 4:3 ratio** — which now also means
re-cropping five supplied 4:3 photographs — or **the `1.15fr 1fr` column split**.
Both were ruled out by earlier briefs, so it needs a decision, not a tweak.

**Two accepted height trades from this session, both worth a glance before they
are called final.** (i) The Lamp Lighting plate is a **portrait 4:5 video** now,
so the folded steps no longer flatten to a landscape band: the section gains
~38px at 768 and ~124px at 375 (the clip is capped at 360/300px wide and centred).
(ii) The Neivedhyam control row **stacks in the 992–1199.98 band**, because a pill
CTA cannot fit two lines of its label beside the counter and arrows in a 402px
column — that band's section height goes 656.6 → 685.6. Both are the price of the
brief's own requirements (the named clip; a 44px CTA at every width).

**One thing worth a decision, not a fix:** the Our Story plate is now a **1x
asset**. `Images/Our Story.png` was supplied at 520×557, which is exactly the CSS
size of the desktop frame, where the old tool-built plate was 1400×1500. Nothing
in the pipeline can invent the missing detail and upscaling would only add bytes,
so it ships native — but it will read soft on a 2× display. **Ask for a
~1400px-wide version of the same composition** and re-run
`tools/build-section-plates.py`; no code change is needed.

**Newest, and the most worth a real browser (the pane refused to composite all
session again):** three things from the consolidation. **(h)** the **gold pill CTA
system** — seven identical buttons on one page is a big shift from the old
maroon/outline/line tiering, and the 1px `#7D620D` rim was chosen from contrast
maths, not from looking at it. If the rim reads heavy, it can only be softened as
far as 3:1 against the *lightest* surface it sits on (ivory) — the numbers are in
the new section. **(i)** the **Lamp Lighting video** actually autoplaying, looping
and pausing from its chip; the pane never allows autoplay, so the clip was proven
to load and to play on demand but never seen running. **(j)** the **five dish
plates in the slide frame** — they were read as a contact sheet at the shipped
crop and they are one photographic set, but not seen in situ with the copy beside
them.

Seven older items still want a real browser, none blocking.
**(g):** look at the **blended header over
the banner** at a wide window (1600–1920), where the agarbatti cartons sit
directly behind the bar. The contrast is computed and safe (8.24:1 worst) and the
arrangement was composited in Pillow and read, but the *feel* of the scrim over
the packaging — how much it dims the tops of the cartons, and whether the ramp's
foot reads as invisible against a moving parallax — is a judgement only a real
render settles. If it reads heavy, the lever is the three alphas in `.nav-scrim`,
and §Banner + navigation blending has the table saying what each width can afford.
Then: **(a)** eyeball the homepage — the pane refused to composite this session too,
so the page has been measured far more than it has been seen. Worth a look at the
new **Agarbatti scene tile beside the Lamp Oil one** (both are now 1400×646
photographs on the same gold set, so they should read as a matched pair), at the
**Neivedhyam section** now that the plate is top-aligned with the copy, the first
offering is **Rava Pongal** and the control row is split (CTA left, `01 / 05` +
arrows right) — the one thing to judge by eye is the 166px of trailing space under
the note at 1440, which is structural (see §NEXT TASK above) — and at the **Our
Story plate now that it keeps 14:15 on
tablet** instead of flattening; **(b)** confirm the Neivedhyam CTA's animated
deep link actually scrolls to `#neivedhyam-dishes` — it now fires from the
control row rather than the slide copy, same handler; **(c)** confirm the
Products dropdown's animated scroll to `#products` (both destinations and
geometry are confirmed, only `behavior: 'smooth'` is unobservable here);
**(d)** sanity-check the five Neivedhyam photographs in situ — they were audited
as a contact sheet, not in the slide frame; **(e)** look at the nav star's
fade-and-scale on hover — the state changes were measured under a real cursor
and are correct, but the 0.35/0.45s transition itself was measured with
transitions disabled; **(f)** see the **Neivedhyam CTA below ~1270px**, where its
label sets to two lines inside the 52px button — now a wider band than before,
since the row moved to the narrower copy column (measured correct at 1200 and 992:
two lines, box still 52, row still 54 — but not seen).

*Last done (2026-08-13): the home page shiny CTA — `button-02` in
`src/components/shadcn-space/button/`, on Lamp Lighting, Festivals and the
closing band, with the reflection behind the label so the 14px text never drops
below 7.81:1. Shop Now, the Neivedhyam CTA, the nav's Contact Us and all four
inner pages untouched. See §Home page shiny CTA. Earlier the same day: the
navigation bar was painted under the hero because `z-50` was glued to a `${`
interpolation and Tailwind never emitted it — see §Navigation restored.
Previously (2026-08-12): CTA shine + 16px prose + the unclickable slider arrow —
gold pill rim off with a left→right hover shine, Shop Now and the Neivedhyam CTA
back to `.cta-line`, that CTA on the paragraph's left rail, all homepage prose at
16px, the chakra at 180s, and `.nv-controls` positioned so `.nv-track`'s
stacking context stops swallowing the next arrow. See §CTA shine, 16px prose &
the unclickable arrow. Earlier the same day: the twelve-point home page consolidation — nav star out,
Figtree, one gold pill CTA system, the Lamp Lighting video, five local dish plates,
right-grouped slider controls, 16/8px image corners. See §Home page consolidated
update. Earlier the same day: banner + navigation blending — the header dissolves into
the hero on the homepage. See §Banner + navigation blending. Earlier the same day:
Neivedhyam — Rava Pongal, top-aligned plate, split
control row. See §Neivedhyam: Rava Pongal, top-aligned plate & split control row.
Earlier the same day: Neivedhyam control row moved into the copy column — see
§Neivedhyam control row → the copy column. Earlier the same day: homepage imagery / nav CTA / slider group / footer — see
§Imagery, nav CTA, slider group & footer. Earlier the same day: nav star + Neivedhyam slider controls — see §Nav star &
slider controls. Earlier the same day: banner / sticky CTA / Neivedhyam brief — see §Banner,
sticky CTA & Neivedhyam. Previously (2026-08-11): nav / Our Story sizing / footer brief — see §Nav, Our
Story sizing & footer. Earlier the same day: homepage strict update — nine-point brief covering
headline clipping, the CTA band, eyebrow marks, two CTA relocations and a new
inter-section rule. See §Homepage strict update. Earlier the same day: Our Story rebuilt to a supplied reference — cream band,
two halves, gold display headline, quote card, new locally-built plate. See
§Our Story redesign. Earlier the same day: closing CTA compacted to one fold — icon + eyebrow
removed, bloom and padding cut, magnetic tween off the button. See §Closing CTA
compaction. Earlier the same day: homepage update against a 7-point brief — 720px hero on
a 1520 container, story description moved, nav dropdowns collapsed to one,
Festivals & Traditions section restored, single Neivedhyam CTA, FAQ retitled,
sticky CTA turned into a right-edge vertical tab — see §Homepage update. Earlier
the same day: layout adopted against the comp + Bootstrap added (§Layout
adoption), closing CTA rebuilt (§Closing CTA), typography swapped to
Fraunces/Inter (§Typography system), hero banner re-framed (§Hero plate).*

### Backlog (unprioritised)
- **The four dropped Neivedhyam offerings are gone from the homepage** (Arisi
  Upma, Murukku, Adhirasam, Besan Ladoo — the brief asked for exactly five). If
  they should live anywhere, it is the Festival Customs page's dishes block;
  that page was explicitly out of scope this session. Their old image URLs were
  mostly the wrong dish anyway — don't restore them as-is.
- ~~**Neivedhyam photography is still remote**~~ — **done 2026-08-12.** All five
  plates are supplied artwork, built by `tools/build-dish-plates.py`. The section
  makes no third-party image request at all now.
- **Lamp Lighting and the festival cards are the last remote imagery on the
  homepage.** Lamp Lighting's own plate went local as a *video* this session, but
  `FestivalsSection.tsx` still pulls three Unsplash crops at runtime. Preconnect
  is in place; supplied artwork would remove the origin entirely, and
  `tools/build-dish-plates.py` is now the closest pattern to copy.
- **The 1.36MB video is uncompressed-as-supplied.** It ships byte-for-byte from
  `Images/Lamp Lighting Guide.mp4` — 550×690, 10s, H.264 — and it is now the
  largest asset in `dist` by 5×. It is below the fold and `preload="metadata"`,
  so it does not compete with the hero, but a WebM/AV1 companion source or a
  re-encode would likely halve it. No tool script exists for video yet.
- **Bootstrap is carrying dead weight.** Full `bootstrap.min.css` is imported
  but only its grid, display and flex utilities are used. It is ~230KB raw of
  the 271KB bundle; `bootstrap-grid.css` would cut that to ~70KB with no loss.
  Left as-is because full Bootstrap was the explicit choice — revisit only with
  the user.
- `Dheepam Website/src/imports/products/` still holds `pooja-bundles.png`,
  `temple-oil.png` and now `lamp-oil.png`, all unreferenced — the last became
  dead when the Lamp Oil tile went to a scene photograph, and `agarbatti.png` was
  deleted this session when the same happened to Agarbatti. Safe to delete if
  those cut-outs won't return (already tree-shaken from the bundle). **Deleting
  all three would leave the `.tile-shot` / `.tile-ground` packshot treatment with
  no asset to demonstrate it** — see §Imagery, nav CTA, slider group & footer for
  why the code path was kept.
- **The Diwali plate differs between the homepage card and the Festival Customs
  page.** The homepage got a real Diwali photograph this session; the detail page
  still uses `photo-1702505433756-88130191bb4b`, the brass-kuthuvilakku shot that
  read as Karthigai. That page was out of the brief. If the two should match, the
  detail page should adopt the homepage's — not the reverse.
- ~~Lamp Lighting still pulls its photography from Unsplash at runtime~~ —
  **done 2026-08-12**, and it is a local video rather than a photograph.

---

## Home page shiny CTA (2026-08-13, latest)

The shadcn "shiny button" pattern adapted to the Dheepam CTA system, home page
only. **New:** `src/components/shadcn-space/button/button-02.tsx` and
`button-02.css`. **Changed:** `LampLightingSection.tsx`, `FestivalsSection.tsx`,
`Footer.tsx`, `App.tsx`. **`src/index.css` was not touched.** `tsc --noEmit`
clean, `npm run build` green, `@layer bootstrap{` still ahead of `@layer theme{`.

> **The brief referred to "the supplied Shadcn shiny-button implementation" but
> no code came with it.** This is built from the canonical pattern — a narrow
> gradient band swept across the box by a pseudo-element — not from a specific
> file. If there was an intended source, diff it against `button-02.css`.

### The project is not a shadcn/ui project

There is **no `components.json`**, no `@/components/ui`, no `lib/utils`, no `cn`
helper, no `class-variance-authority`, no Radix, and no `tailwind-merge`. The
stack the brief asked to confirm is otherwise all present and current: **React
19.2.3, TypeScript 5.9.3, Tailwind v4.2.4** (`@tailwindcss/vite`, no config file
— the theme is `@theme` in `index.css`), Vite 8, npm + `package-lock.json`.

**Nothing was installed, and shadcn was not initialised.** It would have added a
second button system beside `.cta` — CVA variants, a `cn()` merge helper and a
`components.json` whose aliases duplicate the existing `@ → src` one — to ship a
gradient and a keyframe. The site's own `<Button>` already supplies everything
`shadcn/ui`'s Button would (the polymorphic `<a>`/`<button>` split, variants, an
icon slot), so `button-02` **wraps `<Button variant="gold">`** and adds one
class. If shadcn/ui is wanted later for its own sake, that is a separate
decision: `npx shadcn@latest init` with aliases `@/components`, `@/lib/utils`,
`@/components/ui`, `@/hooks`.

**Path.** The brief asked for `components/shadcn-space/button/button-02.tsx`.
The repo's components root is `src/components/`, so the two files sit at
`src/components/shadcn-space/button/` — the requested path, under the root the
project actually uses. Import: `@/components/shadcn-space/button/button-02`.

### The reflection paints behind the label — the one real finding

The site's existing hover shine is a bare `::before`, which paints **over** the
label. That is fine for 0.85s once per hover and wrong for something ambient, and
the numbers say why. An ivory wash at alpha *a* lightens the ink and the fill
together, so they converge:

| ivory alpha | if the band were **over** the text | shipped: band **behind** the text |
|---|---|---|
| 0 (at rest) | 7.81:1 | 7.81:1 |
| 0.10 | 6.64:1 | 8.57:1 |
| 0.19 | 5.29:1 | 9.32:1 |
| 0.28 | 4.11:1 ✗ | 10.11:1 |
| **0.38 (peak)** | **3.14:1 ✗** | **11.06:1** |
| 0.50 | 2.34:1 ✗ | 12.29:1 |

Over the text the ceiling for 4.5:1 is **~0.245 alpha** — the effect would have
had to be tuned down to almost nothing to stay legal. Behind it, the fill
lightens and the ink does not, so contrast **only ever climbs** and no alpha can
break it. That is `.cta.btn-02 > span, .cta.btn-02 > .cta-arrow { position:
relative; z-index: 1 }` with the band at `z-index: 0`, and it is the reason the
brief's "text must remain readable throughout" is satisfied by construction
rather than by tuning. **Don't move the band above the label to make it brighter
— it is the wrong knob.**

### What the button is

- **Geometry and type are entirely inherited.** 44px `min-height`, `999px`
  corner, 14px Figtree 600 at 0.1em tracking, 34px side padding (22 below sm),
  the 12px gap and the shared arrow with its 6px hover nudge — all from
  `.cta` / `.cta-gold`. Measured identical on all three at 320 / 375 / 576 / 768
  / 992 / 1440: **height 44, 14px Figtree** at every width, and the four
  non-shiny CTAs on the page read the same 44/14/Figtree.
- **No black outline.** `border-color: transparent`, not deleted — `.cta-gold` is
  `border: 1px` and the box is `min-height`-driven. Measured
  `rgba(0, 0, 0, 0)` on all three.
- **The band:** `::after`, 38% of the box wide, ivory `0 → 0.38 → 0` across 90°,
  skewed −18° so the leading edge rakes (the same rake the hover shine used).
  `translateX(-160% → 320%)` over **26% of a 4.6s cycle** — 1.2s of travel, then
  3.4s parked off the right edge. Proven from the live animation object
  (`getAnimations`, CLAUDE.md §7.24): `btn-02-shine`, `::after`, `running`,
  4600ms, infinite, keyframes `translateX(-160%) skewX(-18deg)` →
  `translateX(320%) skewX(-18deg)`. **Left to right, read off the keyframes.**
- **The legacy `::before` shine is switched off on this button** —
  `content: none` at (0,3,1), so the `:hover` rules in `index.css` have no
  pseudo-element to animate. Measured `::before content: none` on all three, and
  still `""` on the nav's Contact Us, which keeps it.
- **States.** Hover is inherited (#E3B341, label **9.70:1**). Pressed is new —
  #B8901F plus a 1px settle, label **6.34:1** — because a touch device has no
  hover to read. `.cta`'s transition shorthand had to be restated to put
  `transform` on 0.12s: on the house 0.45s the settle arrived after the finger
  had left.
- **Focus.** Restated rather than inherited, because **the closing band needed
  fixing**: `.cta:focus-visible` is maroon, and maroon *is* that band —
  **1.00 / 1.33 / 1.54:1** against its three stops, i.e. invisible. Ivory clears
  it at **8.71 / 11.57 / 13.38:1**. On the ivory sections the ring stays maroon
  at **8.71:1** (the global gold ring is 2.35:1 and unusable). `outline-offset:
  3px` keeps the ring on the section ground, so the ground is what it has to
  clear.
- **Reduced motion** removes the band at the element (`content: none`), not via
  the global `animation-duration: 0.001ms` clamp — with the duration clamped the
  band is still composited for a frame. **Proven behaviourally:** applying the
  same declaration live took the running `btn-02-shine` count **3 → 0**, and
  removing it took it back to 3.
- **Two bonus modes.** `prefers-contrast: more` puts the `#7D620D` rim back
  (5.70:1 on ivory) so the *block* gets a 3:1 boundary for users who asked the OS
  for one — without changing the default look the brief specified.
  `forced-colors: active` drops the band and takes `ButtonBorder`.

### Scope — what did not change

- **Shop Now (both tiles) and the Neivedhyam control-row CTA are untouched.**
  Measured on the live page: `cta cta-line`, `border-radius: 0`, transparent
  background, `::after` = the underline with **no animation**, `::before` = none,
  height 44. No `.btn-02`.
- **The four inner pages are untouched.** `Footer` renders `.closing` under every
  route, so it takes `currentPage` and picks `Button02` on home and the untouched
  `<Button variant="gold">` everywhere else — one props object, two renderers.
  Verified on `lamp-lighting`: **0** `.btn-02` nodes, the closing CTA is
  `cta cta-gold closing-cta` with its `::before` intact, and *Shop Dheepam Lamp
  Oil* still reads `rgb(125, 98, 13)` / `overflow: visible`.
- **`index.css` was not opened.** Everything new lives in `button-02.css`.
- Document height 1440: **6371** against the recorded 6370. Real horizontal
  overflow at 320 / 375 / 576 / 768 / 992 / 1440: still only the three documented
  `.hero-media scale(1.1)` layers. `.magnetic` still **0**, `[data-anim]` still
  **38**. Own `error` / `unhandledrejection` / `console.error` / `console.warn`
  capture across a route walk (home → guide → home → customs → home) returned
  **zero**.
- **Hit-tested, not `.click()`ed** (CLAUDE.md §7.20). `.btn-02` adds `isolation:
  isolate`, which makes each button a stacking context, so this mattered:
  `elementFromPoint` at each button's own centre returns its label span and
  `el.contains(t)` is true for all three, with the page collapsed to bring each
  into view (§7.21). Both routing CTAs were then driven through a real dispatch
  and land on their pages.

### The nav's Contact Us was deliberately left on the old treatment

It is the one gold pill that is **site chrome rather than page content**: fixed
to the viewport, rendered under all five routes, and carrying its own
`.nav-over-hero` state (the ivory ring over the banner). Two reasons it is not
shiny. A permanently-looping highlight pinned to the top of the window is the one
place ambient motion stops being ambient — every other shiny CTA is only in view
while you are reading its section. And converting it means either changing the
inner pages, which the brief forbids, or route-gating the header. It keeps the
identical gold pill and its once-per-hover shine, so nothing reads as mismatched.
**If you want it shiny it is one line** — `className="nav-cta btn-02"` on both
`<Button>`s in `Navbar.tsx` (bar and sheet), gated on `currentPage === 'home'`.

### WCAG summary

| Check | Result |
|---|---|
| Label 14px, ≥4.5:1, at rest | #111 on #C9A227 — **7.81:1** |
| Label during the shine, worst frame | **7.81:1** (rises to 11.06 at the peak) |
| Label on hover / pressed | **9.70:1** / **6.34:1** |
| Focus ring vs adjacent ground, ivory sections | maroon — **8.71:1** (needs 3:1) |
| Focus ring vs adjacent ground, closing band | ivory — **8.71–13.38:1** |
| Touch target | **44×44 floor held at every width**, plus `touch-action: manipulation` |
| Reduced motion | band removed at the element; 3 → 0 animations, proven live |
| Text carried by the shine? | **No** — the shine only ever raises contrast |
| Block boundary (non-text) | **2.38:1 on ivory — the known, accepted trade**; see below |

**The one thing that is still not conformant, and it is inherited, not new:** the
gold fill has no 3:1 boundary on the ivory sections. That trade was made on
2026-08-12 when the brief asked the `#7D620D` rim off, and this brief repeated
"no black outline or border", so it stands. The pill's cues are its fill, the
uppercase label, the arrow and now the reflection. `prefers-contrast: more`
restores the rim for users who ask. On the closing band the fill is 3.66–5.63:1
and the question does not arise.

**WCAG 2.2.2 (Pause, Stop, Hide) is worth naming rather than glossing.** The
reflection is decorative, auto-starting and loops indefinitely, which is the
shape 2.2.2 addresses — there is no pause control on it. It follows the
precedent already set by `.mandala-spin`, the 180s chakra rotation that has run
on three homepage nodes since 2026-08-12 with no control either, and it is off
entirely under `prefers-reduced-motion`. **If that is not acceptable, the fix is
to make the loop finite** — `animation-iteration-count: 3` in `button-02.css`
turns it into a 14s flourish on arrival and satisfies 2.2.2 outright.

### Not verified

**The pane refused to composite all session again** (`screenshot` returns "the
Browser pane is not displayed"), so every number above is
`getBoundingClientRect()` / `getComputedStyle` / `getAnimations`, and **no frame
of the reflection was seen in the real render**. What was done instead
(CLAUDE.md §7.9): the pill was rebuilt in Pillow at its measured geometry —
392×44, radius 22, 34px padding, a 148.25px band at 0.38 skewed −18° — and the
sweep sampled at seven keyframe positions plus every state, then read. It reads
as a quiet raking highlight with the label legible in every frame. **The
typeface in that sheet is a system stand-in, not Figtree** (Figtree is proven on
the live DOM); the sheet is about the light, not the type. Also unobserved:
`:focus-visible` on any CTA (§7.19 — the rules and their resolved colours were
asserted in the built CSS and the ratios computed), and the press settle.

---

## Navigation restored (2026-08-13)

**One character. `src/components/Navbar.tsx:105`, and nothing else.**

```diff
- className={`fixed top-0 left-0 right-0 z-50${overHero ? ' nav-over-hero' : ''}`}
+ className={`fixed top-0 left-0 right-0 z-50 ${overHero ? 'nav-over-hero' : ''}`}
```

### What was actually wrong

Not the markup, not the CSS, not the responsive rules — **all of it was already
correct and none of it was touched.** `navLinks` still held all five items with
both dropdowns; `.nav-link`, its hover underline, the active-state colours and
the mobile sheet were all intact and rendering.

The bar was simply **painted underneath the hero banner.**

`z-50` written as `` z-50${…} `` gives Tailwind's scanner the candidate `z-50$…`,
which is not a valid utility, so **`.z-50` was never emitted into the stylesheet**
— confirmed: `.z-50` count in the built CSS was **0**. The `<nav>` therefore
computed to `z-index: auto`. It is `position: fixed`; `#hero` is `position:
relative` and comes later in tree order; two positioned elements both at
`z-index: auto` in the same stacking context paint in **DOM order**, so the hero
won. The nav was behind an opaque photograph.

**The evidence, before the fix** — `elementFromPoint` at the centre of every
single menu item:

| Item | Topmost element at its own centre | Hits itself |
|---|---|---|
| Dheepam — home | `div.shell-wide.shell-hero.hero-frame` | ✗ |
| Home | `div.shell-wide.shell-hero.hero-frame` | ✗ |
| Products | `div.shell-wide.shell-hero.hero-frame` | ✗ |
| Lamp Lighting | `div.shell-wide.shell-hero.hero-frame` | ✗ |
| Festivals & Traditions | `div.shell-wide.shell-hero.hero-frame` | ✗ |
| CONTACT US | `div.shell-wide.shell-hero.hero-frame` | ✗ |

The nav did not appear anywhere in the top four layers of the paint stack. After
the fix, all six return themselves and `getComputedStyle(nav).zIndex` is `50`.

**The reason it read as "the menu disappeared" rather than "the bar looks wrong":
`fixed`, `top-0`, `left-0` and `right-0` came from the same template literal and
all four emitted fine** — they are followed by spaces. Only the class touching
`${` was dropped. So the bar was still perfectly positioned across the top of the
viewport, full width, correct height, correct type — just behind the banner.

### This was not introduced by the deployment work

The production CSS built at the **start** of the deployment session — before any
change — hashed `index-DaJEz4f6.css`, and `.z-50` is absent from it. The final
deployment build produced **the same hash**, so the stylesheet was byte-identical
throughout. The bug predates that session and came in with `.nav-over-hero`
itself (§Banner + navigation blending, `Navbar.tsx` last written 2026-08-12
17:27) — the edit that introduced the `overHero` interpolation is the edit that
glued it to `z-50`. There is no commit to revert to (the repo has no history
yet), so the fix is forward, and it restores the documented intent: `index.css`
line 648 already says `.quiz-fab-wrap` sits *"at z-index 40 … under the fixed nav
(z-50)"*.

### Verification

Hit-testing, not screenshots — the Browser pane was not compositing, so
`elementFromPoint` and computed styles were the reliable instruments.

- **Desktop 1280** — `z-index: 50`; all 6 items hit-test to themselves. Over the
  banner: active *Home* `#F5D161` gold, inactive links ivory `#FFFDF7`, CTA ink
  on gold — matching §Banner + navigation blending.
- **Tablet 768** — burger `display: block`, 40×29, hit-testable; the four desktop
  links correctly collapse to zero width; CTA retained.
- **Mobile 375** — bar 76px, burger and logo both hit-testable, no horizontal
  overflow.
- **Drawer, at both 768 and 375** — all **11** controls present and every one
  hit-testable: logo, Menu, Home, Products (+ Lamp Oil, Agarbathi), Lamp
  Lighting, Festivals & Traditions (+ Festival Customs, Neivedhyam Dishes &
  Recipes), Contact Us. Scroll lock (`body overflow: hidden`) working. **No item
  was removed or renamed.**
- **Hover / active** — `.nav-link::after` is the gold `#C9A227` hairline at
  `scaleX(0)`, taken to `scaleX(1)` by `:hover` and by `[data-active='true']`;
  measured on the active link at 100% width, 1px, gold. `data-active` reads
  `true` on the current page and `false` on the other three.
- **Scrolled state** — React writes `background: rgba(255,253,247,0.92)` and
  `--nav-cur: var(--nav-h-scrolled)` → resolves to `92px`, and `.nav-over-hero`
  is dropped. *(The computed background and height lag behind the inline style in
  the preview pane: both are mid-`transition` and transitions do not advance
  without compositing. Read the inline style attribute, not the computed value.)*
- **Every Tailwind utility in `Navbar.tsx` audited against the built CSS** — all
  17 present, including the escaped ones (`.gap-1\.5`, `.left-1\/2`,
  `.-translate-x-1\/2`). `z-50` was the only casualty.
- `tsc --noEmit` clean, `npm run build` green. CSS grew exactly **+20 bytes** —
  `.z-50{z-index:50}`, the one rule that was missing.

### Scope

Nothing else changed. No banner, no CTA styles, no page sections, no inner pages,
no CSS file. The two other template literals in the codebase that glue a class to
`${` — `ProductsShowcase.tsx:102` (`tile-plinth fold-plinth${…}`) and
`StickyCTA.tsx:42` (`quiz-fab-wrap${…}`) — were checked and are **safe**: both
concatenate hand-written design-system classes that live in `index.css`
unconditionally, so the scanner is irrelevant to them. Only Tailwind utilities
are exposed to this failure.

---

## Deployment prep — GitHub + Vercel (2026-08-12)

Repo structure, asset organisation and deploy config only. **No component, CSS,
copy, animation or layout change** — `src/index.css` and every file under
`src/components/` are untouched, and the two section plates were rebuilt from
source and verified **byte-identical** to what was already shipping.

### The blocker that would have shipped a broken site

`.gitattributes` came from the Figma Make scaffold as a generated "Git LFS
Tracking Rules" file — 200 lines routing `*.png`, `*.jpg`, `*.webp`, `*.mp4`,
`*.woff2` and much more through `filter=lfs diff=lfs merge=lfs`.

**Vercel clones the repository without fetching Git LFS objects.** Every asset in
`src/imports/` would have arrived in the build container as a ~130-byte text
pointer. Vite does not validate image contents — it would have hashed and emitted
those pointers as `hero-banner-<hash>.webp` and friends, the build would have gone
green, and the deployed site would have had **no hero, no product tiles, no dish
plates and no Lamp Lighting video**. This is the worst class of deploy bug: silent,
green, and invisible until someone loads the URL.

The file is rewritten with no LFS filters — `* text=auto` plus `binary` on the
media extensions so Git does not CRLF-mangle them on Windows. The shipped assets
total **~3.2MB**, which plain Git carries without complaint. **Verified after
staging:** `git cat-file` on the staged `hero-banner.webp` blob returns 167,678
bytes starting `RIFF....WEBP` — real content, matching disk exactly. A scan across
`src/`, `public/` and `dist/` finds **0 files** beginning `version https://git-lfs`.

**Do not reintroduce LFS here** unless Vercel's LFS checkout is configured first.

### The other six findings

| # | Problem | Fix |
|---|---|---|
| 1 | **Two lockfiles.** `pnpm-lock.yaml` (Aug 9, stale) alongside `package-lock.json` (Aug 11, current). pnpm is checked **first** in Vercel's package-manager detection, so the deploy would have installed from the stale lockfile — or failed on a frozen-lockfile mismatch. | `pnpm-lock.yaml` deleted (backup in the session scratchpad) and gitignored along with `yarn.lock` / `bun.lockb`. npm + `package-lock.json` is the standard. |
| 2 | **`<title>` was literally `Figma Make App`**, and so was `og:title` — `.figma/make/site.json` had no `title` key and `vite.config.ts` falls back to that string. | Real title + description + `language: "en"` in `site.json`. |
| 3 | **`robots.txt` was `User-agent: *` / `Disallow: /`** and the HTML carried `<meta name="robots" content="noindex, nofollow">`, from `robots.index: false`. The site was blocked from every search engine. | `robots.index: true` (your call this session). No `robots.txt` is emitted now, and the meta tag is gone. |
| 4 | **No favicon** — `/favicon.ico` would 404 on every page load. | `public/favicon.png` + `public/apple-touch-icon.png` generated from the existing Dheepam roundel (`src/imports/dheepam-neww.png`), padded square so the mark is not stretched; the touch icon is flattened onto the site ivory because iOS composites transparency onto black. Wired via `icons.icon` in `site.json`. |
| 5 | **Hard-coded `D:\Balaji\projects\Dheepam\...` paths** in `tools/build-hero-plate.py` and `tools/build-story-plate.py`; `build-section-plates.py` and `build-dish-plates.py` used depth arithmetic that assumed the old two-level layout. | All four resolve from `Path(__file__)` now, with a `DHEEPAM_IMAGES` env override. **No production code ever referenced a local path** — this was dev tooling only, but it is the same class of problem. |
| 6 | **`.claude/launch.json` pointed at `D:\...\run-dev.cmd`**, a wrapper whose only job was to `cd` into the website folder. | Replaced with a portable `npm run dev` config inside the repo, plus a `dheepam-dist-preview` entry for checking a production build. `run-dev.cmd` is now redundant (left in the parent, uncommitted). |

### Repo root moved

`Dheepam Website\` is the repository root. `CLAUDE.md` and `PROJECT_STATUS.md` were
**moved** into it — not copied, so there is exactly one of each and they cannot
drift. The parent `Dheepam\` keeps a five-line pointer `CLAUDE.md` so a session
started there is still routed to the real files. The four `tools/*.py` builders are
consolidated in the repo; their 1–2MB contact sheets are gitignored (regenerable).

`Images\` stays **outside** the repo on purpose: 35MB+ of uncompressed source art
that the site does not ship. Only the built WebP/MP4 in `src/imports/` are committed.

### Assets stayed in `src/imports/`, deliberately

The brief suggested `public/images/`. They were left where they are because
`src/imports/` already satisfies every requirement — in the repo, no Windows
paths, no runtime disk dependency — and moving them would have been strictly
worse: it means editing 14 import sites across homepage components (which the
brief forbade), and `public/` files are copied verbatim, so they lose content
hashing (no immutable caching) and the build stops failing when an asset goes
missing. `public/` now exists and holds the two favicons.

### Verification

- **`npm ci` from a wiped `node_modules`** — 47 packages, 0 vulnerabilities. This
  is exactly what Vercel runs. *(It failed the first time with EPERM: a Vite dev
  server from a previous session was still running and holding file locks — see
  §Gotchas.)*
- `npm run typecheck` clean; `npm run build` green in 739ms.
- **Build is deterministic** — two consecutive builds produced identical hashes
  (`index-C1kVxNVW.css`, `index-C6c8I90d.js`).
- **The CSS grew 278.91 → 280.66kB and both hashes changed without a source edit
  — and the cause was worth finding.** The first suspect (`npm ci` installing
  exact lockfile versions over a drifted `node_modules`) was **wrong**. The real
  cause: **moving `CLAUDE.md` and `PROJECT_STATUS.md` into the repo root put them
  in front of Tailwind v4's automatic source detection.** Tailwind cannot tell
  prose from JSX, so ordinary English words in the documentation that collide
  with utility names were compiled into the production stylesheet — `.contents`
  (from "image contents"), `.collapse`, `.static`, `.table`, `.shadow`,
  `.flex-shrink`, and the entire `--tw-backdrop-*` `@property` block (from
  CLAUDE.md's `backdrop-filter` discussion). **17 rules, 1,746 bytes**, none of
  it used by the site, and it would have grown with every future status update.
  Fixed with one directive in `src/index.css`: `@source not "../**/*.md"`.
  **This is the only edit made to `index.css`, and it is a build directive, not
  a style** — proven by building with the `.md` files physically deleted and
  diffing: **byte-identical**. The final bundle hashes are `index-DaJEz4f6.css`
  and `index-D52L5poO.js`, which are **the exact hashes from the first build of
  the session, before any change** — the strongest available evidence that
  nothing visual moved.
- **All 12 hashed media assets appear in the built bundle** — no orphans.
- `dist/index.html` verified: real `<title>`, `lang="en"`, `<link rel="icon">`, no
  `noindex`, no `robots.txt`.
- Site rendered from the repo root: all 8 sections present in documented order,
  14 images, the video, favicon serving.
- **`.gitignore` proven with `git check-ignore`**, not assumed — `node_modules/`,
  `dist/`, `.env`, `.env.local`, `.claude/settings.local.json`, `pnpm-lock.yaml`
  and the contact sheets are all excluded. Final staged manifest is **69 files**,
  nothing matching `node_modules|^dist/|\.env|secret|\.key$|\.pem$`.
- **No secrets exist to leak** — no `.env` file anywhere, no API keys, no tokens;
  `settings.local.json` was scanned and holds only a permission allowlist.

### Deliberately not done

- **No SPA rewrite in `vercel.json`.** Routing is state, not URL — nothing reads
  `window.location` (grepped: zero hits for `location` / `pushState` / `pathname`),
  so there are no deep-link URLs to catch. A catch-all rewrite would only serve
  HTML in place of genuine asset 404s and make them harder to spot.
- **No `og:image`.** `og:title`/`og:description` ship, but choosing the share
  image is a brand decision. `openGraph.image` in `site.json` takes it when you pick.
- **`build` is still `vite build`, not `tsc && vite build`.** Gating the deploy on
  the type-checker was tempting, but it changes existing behaviour and would let a
  type-only regression block a content deploy. `npm run typecheck` is separate.
- **`.mise.toml` still pins pnpm 10.34.3** and the `.figma/make/*` helper scripts
  still call `pnpm run build`. Vercel reads neither. Left alone as Figma scaffold.

---

## Current shape of the site

**Homepage:** hero → brand-story → products → lamp-lighting → **`.rule-temple`** → festivals → neivedhyam → faq → footer
(all wrapped in `.home-page`, the scope hook for homepage-only CSS)
**Pages:** `home | lamp-lighting | festival-customs | contact | knowledge`

| Section | State |
|---|---|
| Hero | Dark amber banner, edge-to-edge (no bottom fade). **The header dissolves into it** (2026-08-12): on the homepage, unscrolled, the bar is transparent with no hairline and no backdrop blur, light type over `.nav-scrim` — see §Banner + navigation blending. **Fixed 720px desktop height on a 1520px container** (`.shell-hero`) — see §Homepage update. 3-slide headline rotator, 16px description, inline slide markers. **No CTA and no scroll cue** (removed 2026-08-12). Plate is pre-framed 1.649:1 — see §Hero plate. |
| Brand Story | **Rebuilt 2026-08-11 to the Our Story reference.** Warm-cream band (`.story`), two halves: copy cols 1–6 (eyebrow, two-tone headline, kolam divider, two paragraphs, quote card) and a sharp-cornered 14:15 plate cols 7–12, tops aligned. **Plate capped at `--story-plate-max: 520px`, flush to the content rail, and the section runs its own tighter `padding-block` so it clears one desktop fold — 677px at 1440.** Plate is the supplied `Images/Our Story.png` → `imports/our-story.webp`, authored at exactly 520×557, so it **keeps 14:15 at every breakpoint** (2026-08-12) — no crop anywhere. **No CTA.** |
| Products | **Two products only** (Lamp Oil, Agarbatti). Each tile's `Shop Now` is a **`.cta-line` text link** — reverted 2026-08-12 (latest) after one session as a gold pill, so it takes no shine; still a `<span>`, because the whole tile is the link. Header is two halves on the tiles' rails: eyebrow + title 1–6, the "Pure, trusted…" line 7–12 (back from Brand Story, 2026-08-11). Tiles 13/6, equal height. **Both are full-bleed *scene* photographs now** (2026-08-12) — matched 1400×646 shots on the same gold set, so the pair reads as one campaign. The cut-out-packshot treatment (`scene` falsy → `.tile-shot` on a plinth) is still in the code but has no consumer. |
| Lamp Lighting | Split editorial — copy cols 1–6, 4:5 plate cols 8–12 — plus the slow-spinning mandala. **The plate is the supplied `Lamp Lighting Guide.mp4`** (2026-08-12), authored at 550×690 so it fills the existing 4:5 frame with no crop: muted autoplay on a loop, `playsInline`, a 40px gold pause chip bottom-left, and no autoplay under `prefers-reduced-motion`. **The folded steps no longer flatten to 16:9 / 4:3** — the clip keeps 4:5 and is capped at 360px (tablet) / 300px (phone), centred. Four topics live on the guide page, not here. **Its CTA is the shiny `Button02`** (2026-08-13). |
| Festivals | **Restored 2026-08-11.** Header (title left, intro + CTA right, **top-aligned**) + three `.col-3up` cards — Diwali, Karthigai Dheepam, Navarathri. The CTA sits under its intro, not under the cards, and is the shiny `Button02` (2026-08-13). Cards turn on their side below 767.98px. **The Diwali plate is `photo-1635192592106-77a5aacbe1a3`** (2026-08-12) — a flower kolam ringed with lit diyas; it no longer matches the Festival Customs page's Diwali image. |
| Neivedhyam | **5-slide offering slider**, and the five are the brief's own dishes in its own order (2026-08-12, latest): **Paal Payasam · Boondi Laddu · Puliyodarai · Sakkarai Pongal · Kesari Bath**, each on a **local supplied plate** from `tools/build-dish-plates.py`. Draggable GSAP track, per-slide supporting note. **Plate and copy column are top-aligned.** The control row sits in the **copy column and is split** (2026-08-12, latest): the CTA on the paragraph's **left rail**, `01 / 05` · ← · → on the content rail, and nothing else (the dots went 2026-08-12); its bottom lands on the plate's bottom edge, which leaves structural space under the note. Arrows are **48px round gold chips** — still rimmed. The CTA deep-linking `#neivedhyam-dishes` is a **`.cta-line`** again, which is what makes the left alignment exact and what retired the stacked 992–1199.98 row. **`.nv-controls` is `position: relative; z-index: 1`** — without it `.nv-track`'s `will-change: transform` stacking context covers the row and the next arrow is unclickable. Nothing interactive is left inside the track, but the drag-then-click guard stays. |
| FAQ | Two-column: heading + categories left, accordion right. Titled **"Frequently Asked Questions"**. |
| Closing | `.closing` — maroon→burgundy + gold, the one dark surface. Two-column: lotus-bloom photograph left, copy + the shared **gold pill CTA** right (it was an outlined gold hairline until 2026-08-12; `.closing-cta` now adds only a soft drop shadow). **On the homepage that pill is the shiny `Button02`** (2026-08-13) with an ivory focus ring, because maroon — the site's CTA ring — is this band's own colour and measures 1.00:1 on it. Off the homepage it is the unchanged `<Button variant="gold">` with the rim-off + hover shine, which is why `Footer` now takes `currentPage`: `.closing` renders under every route. Its `.lead` is the one homepage paragraph still at 20px — see §NEXT TASK. **Compacted 2026-08-11 to 480px at 1440** (was ~925): no glyph, no eyebrow, grid capped at 1080, static CTA, and **no divider below the CTA** (removed 2026-08-11 — it read as an underline). See §Closing CTA and §Closing CTA compaction. Then light footer. |
| Quiz | **Removed from homepage.** Now its own `knowledge` page, reached via the sticky launcher and the footer. |
| Sticky CTA | **Vertical tab flush to the right edge, centred on the viewport.** 46px wide desktop / 40px tablet+phone, flame + on-its-side label — **no count chip** (removed 2026-08-12); label hidden ≤575.98px. Greeting bubble opens to its left once per session. Hidden on the knowledge page. |

---

## CTA shine, 16px prose & the unclickable arrow (2026-08-12, latest)

Six-point brief, **home page only**. **Files changed:** `src/index.css`,
`src/hooks/useReveal.ts`, `NeivedhyamSection.tsx`, `ProductsShowcase.tsx`. No new
file, no asset, no inner page opened. `tsc --noEmit` clean, `npm run build`
passes, `@layer bootstrap{` still at byte 1086 ahead of `@layer theme{` at 236627.

**1 · The gold pill: rim off, shine on.** `border-color: transparent` (not the
declaration deleted — `.cta-gold` is `border: 1px` and the box is
`min-height`-driven, so dropping it would move the padding box 2px in each axis
and re-open the 44px promise). A soft two-stop drop replaces it as the pill's
edge. Scoped to `.home-page .cta-gold, .closing .cta-gold, .nav-cta`, so the
three inner-page gold buttons are untouched — verified on `lamp-lighting`, where
*Shop Dheepam Lamp Oil* still reads `1px rgb(125, 98, 13)`, `overflow: visible`
and no shine.

**Stated plainly, because it is a downgrade and not a wash:** #C9A227 is 2.38:1
on ivory, 2.21 on the Our Story cream and 1.96 on the Neivedhyam champagne. The
rim was the *block's* only boundary at the 3:1 floor; a shadow is not one. What
the pill still has: the 7.81:1 ink label, an uppercase set with a 0.1em track, an
arrow glyph, and — on the closing band — a fill that is itself 3.66:1 on maroon.
The nav's over-hero ivory ring is deliberately preserved: `.nav-over-hero
.nav-cta` is declared earlier and its `box-shadow` is not overridden here, and
`overflow: hidden` does not clip box-shadows.

**2 · The shine, and how it was actually observed.** `::before`, 42% of the box
wide, `rgba(255,253,247,0)` → `0.42` → `0` across 90°, skewed −18° so the leading
edge rakes, `translateX(-150% → 260%)` over **0.85s**, once per hover, on
`:focus-visible` too. `pointer-events: none`, and `overflow: hidden` on the pill
is what clips it to the 999px corner (`::before` does not inherit the radius).

`getComputedStyle(el, '::before')` cannot see `:hover` (§7.11), so this was
proven with **`getAnimations({subtree: true})` under a real cursor** parked by
ref (§7.12) — new gotcha §7.24. The nav's Contact Us returned
`{name: 'cta-shine', pseudoElement: '::before', duration: 850, playState:
'running', keyframes: translateX(-150%) skewX(-18deg) → translateX(260%)
skewX(-18deg)}`. **Left to right, confirmed from the keyframes themselves.**

Reduced motion switches the pseudo-element off with `display: none` rather than
leaning on the global `animation-duration: 0.001ms` clamp — present in the built
CSS inside `@media (prefers-reduced-motion:reduce)`, and **proven behaviourally**
by applying the same declaration live: `::before` goes `display: none` and
`getAnimations` returns **0** `cta-shine` entries.

**3 · Shop Now and the Neivedhyam CTA are back to `variant="line"`.** Both
product tiles' `Shop Now` (still a `<span>` — the whole tile is the link) and the
control-row CTA. All three read `border: 0px`, `radius: 0px`,
`overflow: visible`, **no `::before`**, 0 animations, height 44.

**`.home-page .cta-line::after` had to come back with them.** `.home-page .cta`
gives every CTA a 44px `min-height`, and `.cta-line::after` sits at `bottom: 0` —
so on the homepage the underline would draw at the foot of the box instead of
under the words. `bottom: calc(50% - 0.8em - 6px)` measures from the label's own
centre: **4.79688px** on all three, at 320 / 375 / 1200 / 1440. Inner pages still
read `0px` — the re-pin is `.home-page`-scoped.

**4 · The Neivedhyam CTA on the paragraph's left rail.** `.nv-controls-group`
goes `flex-end → space-between` and `.nv-controls-nav` gets `margin-left: auto`
back. `ctaLeft − descLeft` = **0.00** and `navRight − contentRail` = **0.00**
(−0.01/−0.02 scroll rounding) at 320 / 375 / 768 / 992 / 1200 / 1440 / 1920. The
alignment is exact *because* of point 3: a bare label has no horizontal padding,
so its first glyph is the rail — a pill would have put 34px between them.

**That also retired the stacked 992–1199.98 row.** It only existed because a pill
spends 68px on horizontal padding before the counter and arrows take their 184,
leaving the label ~114px against 190 — three lines, 58.7px. `.cta-line` gives the
68px back, so the band holds one row on a 16px gap, `--nv-row-h: 110px` is gone
from the built CSS and `--nv-row-h` is the arrows' 48 at every desktop width.
**Section height at 992: 685.6 → 653.0.**

**5 · All homepage prose is 16px Figtree.** `.home-page .lead`,
`.home-page .body-lg` and `.home-page .body-sm` → `--fs-body`. Scoped, never at
the token, so the inner pages keep their ladder (verified on `lamp-lighting`:
`.lead` still 20px, `.body-sm` still 14px). Every `<p>` under `.home-page` now
computes 16px/Figtree except the six `.micro` captions at 12 and the Our Story
pull-quote, which is a 28px `.h4` — both are non-prose by design. `.closing .lead`
is excluded on purpose (see §NEXT TASK).

Line-heights were left alone: `.lead`'s 1.5 at 16px reads as the same paragraph
as `.body`'s 1.6 and touching it would move every section for nothing.

**6 · The chakra turns 180s instead of 240.** One line in `useReveal.ts` — 1.5°/s
against 0.75. Direction, easing, `repeat: -1` and the off-screen `ScrollTrigger`
pause are unchanged; three `.mandala-spin` nodes on the page. `duration:180` is in
the built JS and `duration:240` is gone. **Not seen turning** — rAF is frozen here
and the hook's scan never runs (§7.6).

**7 · The slider arrow that was never clickable — the real bug.**

`.nv-track` carries `will-change: transform`, **which makes it a stacking
context**. At ≥992px `.nv-controls` is pulled up by `--nv-row-h` so its bottom
lands on the plate's baseline, which puts the row *inside* `.nv-viewport`'s box —
and a stacking context paints above every non-positioned in-flow sibling
regardless of tree order. So the track sat on top of the row.

Measured before the fix, at the **next arrow's own centre**:
`document.elementFromPoint` returned **`.nv-grid`**, not the button. Two members
of the row escaped by accident and that is exactly why this looked like a
half-broken slider rather than a layering bug: the CTA, because `.cta` is
`position: relative`; and the **disabled** prev arrow, because `.nv-arrow:disabled
{ opacity: 0.4 }` gives it a stacking context of its own — so *prev* appeared to
work and *next* never did.

Fix: `.nv-controls { position: relative; z-index: 1 }`. The whole row moves into
the same paint phase, later in tree order.

**Two sessions of "verified working" missed this because `.click()` bypasses
hit-testing** (new gotcha §7.20). Re-verified by clicking **whatever
`elementFromPoint` returns** at each arrow's centre — the browser's own target:

| Viewport | arrow hit-tests to itself | counter walk (10 real clicks) | row | section (was) |
|---|---|---|---|---|
| 320×720 | prev ✓ next ✓ cta ✓ | 01→05→01, both ends clamp | 110 | **1094.3** (1133.3) |
| 375×812 | ✓ ✓ ✓ | 01→05→01, clamps | 110 | **1013.2** (1049.2) |
| 768×900 | ✓ ✓ ✓ | 01→05→01, clamps | 48 | **1174.8** (1183.8) |
| 992×800 | ✓ ✓ ✓ | 01→05→01, clamps | 48 | **653.0** (685.6) |
| 1200×800 | ✓ ✓ ✓ | 01→05→01, clamps | 48 | **759.6** (759.6) |
| 1440×900 | ✓ ✓ ✓ | 01→05→01, clamps | 48 | **884.9** (884.9) |
| 1920×1000 | ✓ ✓ ✓ | 01→05→01, clamps | 48 | **936.5** (937.0) |

`ArrowRight` / `ArrowLeft` on the slider still step and the counter follows. The
arrows are 48×48 at every width. Reaching the row for a real hit test needed the
preceding `.home-page` children hidden and, on the folded steps, a temporary
`.nv-media{aspect-ratio:6/1}` — scrolling is dead in this pane (new gotcha §7.21).

**8 · Whitespace.** The Neivedhyam section is **shorter at four widths and level
at three** (table above). The only growth on the page is **+33px on the document
at 1440** (6337 → 6370), and it is entirely the Festivals cards taking a line
each at 16px — isolated by putting `.body-sm` back to 14 live, which returns the
document to exactly 6337. Our Story 677.1, Lamp Lighting 841.4, Neivedhyam 884.9
and the closing band 480.4 are all unchanged to the tenth. That is text, not
padding — the brief's own cost for one prose size.

**Also verified.** Every CTA on the homepage still reports **height 44** at all
seven widths (nav, both Shop Nows, Lamp Lighting, Festivals, Neivedhyam, closing),
14px Figtree 600. Zero real horizontal overflow at any width — the only
`rect.width > innerWidth` hits remain the three documented `.hero-media`
`scale(1.1)` layers. `.magnetic` nodes still **0**; `[data-anim]` still **38**. A
fresh in-page `error` / `unhandledrejection` / `console.error` / `console.warn`
capture over the reload, the slider walks, the nav hover, the route change to
`lamp-lighting` and back returned **zero**. Each new rule was located at **top
level** in the minified CSS (`.nv-controls{…z-index:1…position:relative}`,
`@keyframes cta-shine`, the three-selector `::before` group, `.home-page
.cta-line:after`, the 16px prose rule) rather than assumed, and the
reduced-motion opt-out inside `@media (prefers-reduced-motion:reduce)`.

> **Not verified:** no screenshot — the pane refused to composite again, so every
> number is `getBoundingClientRect()` / `getComputedStyle` / `getAnimations`.
> Specifically unobserved: the shine actually *travelling* (its keyframes,
> duration, direction and running state were read off the live animation under a
> real cursor, but rAF is frozen so no frame of it was seen), the chakra turning
> at its new speed, `:focus-visible` on any CTA (§7.19), and the scrolled ivory
> bar (§7.18). **How the shine reads at 0.42 ivory over the gold is the one thing
> genuinely worth a real browser** — the value was chosen for "subtle", not
> measured for it.
>
> **Five new gotchas, now `CLAUDE.md` §7.20–24.** `.click()` proves the handler
> and never the hit area — click what `elementFromPoint` returns. To hit-test
> below the fold, collapse the page (scrolling is dead), don't scroll. A
> pseudo-element's computed style goes stale for the rest of the task once you
> inject a `<style>` — read pseudos in their own call, first. `documentElement.
> style.width` does not re-evaluate media queries, so a sweep done that way
> measures desktop rules at 320px; use `resize_window`. And
> `getAnimations({subtree: true})` *does* reflect `:hover`, which is how a hover
> animation on a pseudo-element gets proven.

---

## Home page consolidated update (2026-08-12)

Twelve-point brief, **home page only**, plus a reference image for the CTA style
(pill, amber fill, dark label, generous horizontal padding, and a round gold arrow
chip beside it). **Files changed:** `index.html`, `src/index.css`, `Navbar.tsx`,
`LampLightingSection.tsx`, `FestivalsSection.tsx`, `NeivedhyamSection.tsx`,
`ProductsShowcase.tsx`, `Footer.tsx`; **new:** `tools/build-dish-plates.py`,
`tools/dish-plates-preview.png`, `src/imports/dishes/{paal-payasam,boondi-laddu,
puliyodarai,sakkarai-pongal,kesari-bath}.webp`,
`src/imports/lamp-lighting-guide.mp4`. **No inner page was opened.**
`tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{` still at byte
1086 ahead of `@layer theme{` at 236624.

**1 · The nav star is gone.** `.nav-star`, its `EyebrowStar` markup in
`Navbar.tsx` and `.nav-over-hero .nav-star` all removed; **0** `.nav-star` nodes
on the page and no `nav-star` string in the built CSS. Because the mark was
absolutely positioned in the inter-link gutter, nothing reflowed — bar height is
114 hovered and at rest. Everything the brief asked to keep is measured: links
**16px** at every width, the active link **`rgb(143,29,37)`** — brand maroon — on
the ivory bar with the **`#C9A227`** underline beside it, and hover still changes
no colour, only drawing the underline in (`.nav-link:hover:after,
.nav-link[data-active=true]:after{transform:scaleX(1)}` in the built CSS). Over
the banner the active link stays **`#F5D161`** with a gold underline, for the
contrast reason documented below.

**2 · Banner + navigation blending: re-checked, unchanged.** No change was needed
— the header still dissolves into the hero (transparent background, no hairline,
no backdrop blur, `.nav-scrim` at opacity 1) and the measured ratios are the ones
in §Banner + navigation blending. What *did* change under the bar is the CTA's
colour, so that was recomputed against the same worst scrimmed pixel (L 0.0774 at
1920): the gold **block** is **3.41:1** where maroon was 1.13, so the button reads
as a button on its own now. The ivory ring is kept anyway — it is what holds the
edge where the banner is brightest, and it is scoped to `.nav-over-hero`.

**3 · The Lamp Lighting plate is the supplied video.** `Images/Lamp Lighting
Guide.mp4` → `src/imports/lamp-lighting-guide.mp4`, imported as an asset.
Verified: serves **200 `video/mp4`**, `readyState 4`, `duration 10.0`,
`videoWidth/Height 550×690`.

That 550×690 is **4:5.02 — the frame's own ratio**, so the desktop plate is
byte-identically the same box the photograph occupied (534.9×668.6 at 1440,
548.9×686.2 at 1600, 543.3×679.2 at 1920, 445×556.3 at 1200) and the section's
rails, grid and `data-anim="mask"` reveal are untouched. The mask was hand-driven
per `CLAUDE.md` §7.6 to prove a `<video>` survives it: `inset(0px 0px 100%)` hidden
→ `progress(1)` → `inset(0px 0px 0%)` → cleared, with the element still reporting
550×690 / readyState 4 afterwards.

Three things the video needed that an `<img>` did not:

- **`.ll-video video`** — `.img-frame img { object-fit: cover }` does not select a
  video, and `.img-frame:hover img`'s scale is neither inherited nor wanted.
- **The folded steps stopped flattening.** `.ll-media` was 16:9 at ≤991.98 and 4:3
  at ≤575.98; a portrait clip in either is cropped to a letterbox slot through the
  middle of the frame. It keeps 4:5 everywhere and is **capped** instead — 360×450
  at 768 and 576 (centred: 172.9px clear on each side at 768), 300×375 at 375,
  280×350 at 320. **This is the session's one real height cost:** the section runs
  941.9 at 768 and 576, 930 at 375, 905 at 320, i.e. +38 to +148px on the folded
  steps depending on what the old landscape band measured there. Desktop is
  unchanged.
- **A pause control and a reduced-motion opt-out.** The clip loops and runs 10s,
  so WCAG 2.2.2 applies. `.ll-video-toggle` is a 40px round gold chip inset 14px
  from the plate's bottom-left (measured inside the frame with 14px clearance),
  carrying the same `#7D620D` rim as the arrows because gold on photography has no
  dependable boundary. Native `controls` was rejected: a browser chrome bar across
  a portrait plate. `autoPlay` is gated on `prefersReducedMotion()`, the toggle
  reads `video.paused` as its source of truth, and `onLoadedData` syncs the icon
  for the case where a browser refuses the autoplay outright (no `pause` event
  ever fires then). Exercised in the pane: chip → `paused: false, currentTime
  2.80` → chip → `paused: true`.

**4 · Figtree, swapped at two tokens.** `--font-sans` and `--font-ui` both go to
`'Figtree', system-ui, sans-serif`, and the Google Fonts URL in `index.html` swaps
`Inter:wght@400;500;600;700` for `Figtree:wght@400;500;600` — only the three
weights the system uses (prose 400, nav links 500, labels and CTAs 600). Because
every consumer already resolved to a token, that is the whole change: verified
`Figtree` computed on `body`, on `.nav-link`, on all seven CTAs, and present in
the built CSS.

Figtree **sets narrower than Inter at the same size**, which moves numbers a
pre-session note would have you expect: the desktop nav's four link left edges
read 614.8 / 703.5 / 829 / 978.2 against the documented 596.4 / 686.5 / 815.6 /
970.1 (the row is narrower, so `justify-between` pushes it right), and the folded
columns come in shorter — Our Story 1197.5 at 768 against 1223. Nothing regressed;
the old numbers are simply stale.

**5 · Five dishes, in order, on local plates.** The whole `offerings` array is
replaced: **Paal Payasam** (Milk Offering) · **Boondi Laddu** (Sweet Offering) ·
**Puliyodarai** (Savoury Rice) · **Sakkarai Pongal** (Festival Pongal) · **Kesari
Bath** (Semolina Sweet), each with a new type, description and note held to the
same length so no slide takes an extra line in the folded column.

The five Unsplash URLs are gone. `tools/build-dish-plates.py` takes
`Images/<Dish Name>.png` (all supplied at ~1450×1085), centre-crops the ~3px of
excess width to exactly 4:3 and writes 1200×900 WebP at q86 —
164.7 / 195.1 / 240.7 / 180.0 / 174.9 KB, each verified serving **200** with those
exact byte counts. 1200×900 covers the largest shipped frame (~700px at 1440) at 2×
with no upscale, so there is no `srcSet` and no remote crop pipeline to keep in
sync. **They were looked at, not trusted** (`CLAUDE.md` §6): the script writes a
labelled contact sheet at the crop the slide ships, and it was read — every plate
is the named dish, and unlike the nine-URL stock mix they are visibly **one set**
(the same brass bowl on the same gold ground, lit by the same lamps).

The slider is fully functional on the new set: five `next` clicks track
01→05 with `Paal Payasam → Boondi Laddu → Puliyodarai → Sakkarai Pongal → Kesari
Bath`, five `prev` clicks track back, both ends clamp against a sixth click, and
`ArrowRight` / `ArrowLeft` do the same. Slides 2–5 read `complete: false` — that is
`loading="lazy"` with no IntersectionObserver ticks (`CLAUDE.md` §7.14), which is
why each was proven by `fetch` instead.

**6 · Controls: `01 / 05` + two round gold arrows, grouped with the CTA on the
right.** `.nv-controls-group` goes `space-between → flex-end` and
`.nv-controls-nav` **loses** its `margin-left: auto` — with the group packed right
that margin would push the pair back out to the far edge and re-open the split
layout. Measured `navRight − contentRail` = **0.00** (−0.01 scroll rounding) at 320
/ 375 / 576 / 768 / 992 / 1200 / 1440 / 1600 / 1920. Dots: still **0** nodes and no
`nv-dot` string in the built CSS.

The arrows become **48px circles filled `#C9A227`** with an ink glyph — the CTA's
own colour, so the row reads as three members of one family. 48 rather than 54
balances them against the now-44px CTA, and `--nv-row-h` moves with them. The
`#7D620D` rim is not decoration: **#C9A227 measures 1.96:1 on the section's
champagne `#F4E6C8`**, so a bare gold chip has no boundary at all; `--ink-gold-text`
is **4.69:1** on the band and stays inside the gold family. Glyph on fill is
**7.81:1**; hover lifts to `#E3B341` (9.70:1) and the rim holds.

**7 · One CTA system: the gold pill.** `--cta-radius: 999px` on `.cta`,
`--cta-h: 52px → 44px`, and **every button on the home page is `variant="gold"`** —
the nav's `Contact Us` (and its mobile-sheet twin), both product tiles' `Shop Now`,
`Explore the Lamp Lighting Guide`, `Explore Festival Customs`, the Neivedhyam
control-row CTA and the closing band's `Shop on Kaleesuwari`. `.cta-solid`,
`.cta-outline` and `.cta-line` are untouched and still used by the inner pages;
**no `.cta-line` renders under `.home-page` any more**, which is why the old
`.home-page .cta-line::after` re-pin was deleted with its last consumer.

Measured at 320 / 375 / 576 / 768 / 992 / 1200 / 1440 / 1600 / 1920, every CTA on
the page reports **height 44** (the nav's too), `border-radius: 999px`,
`font-size: 14px`, `font-weight: 600`, `letter-spacing: 1.4px`, `gap: 12px`,
`padding: 0 34px`, `background: rgb(201,162,39)`, `color: rgb(17,17,17)` and
`border: 1px rgb(125,98,13)`. Hover was measured under a **real cursor**: the fill
flips to `rgb(227,179,65)` and the arrow translates 6px, the shared
`.cta:hover .cta-arrow` tween.

Three things that took work rather than a colour swap:

- **The rim, and why the gold fill cannot ship bare.** #C9A227 is only **2.38:1
  against ivory**, 2.21 on the Our Story cream, 2.14 on the footer beige and 1.96
  on the Neivedhyam champagne — the *label* is fine (7.81:1) but the *button* has
  no boundary the 3:1 floor accepts, where the maroon fill it replaces had 8.63.
  #7D620D gives **5.70:1 on ivory** and 4.69 on the champagne. On the maroon
  closing band the fill itself is **3.66:1**, so the rim is redundant there and
  kept for consistency.
- **The focus ring had to move off gold.** The global `:focus-visible` outline is
  `#C9A227`, which is 2.35:1 on ivory and invisible on a gold button, so
  `.cta:focus-visible` takes `--ink-maroon` — 8.71:1 on ivory, 3.66:1 against the
  fill. It is declared in the CTA block, *above* `.nav-over-hero :focus-visible`,
  so the banner's `#F5D161` still wins at equal specificity where maroon is
  unusable. **Not observed in the browser:** real `Tab` presses do not move focus
  in this pane (new gotcha, `CLAUDE.md` §7.19) — the rule and its value were
  confirmed in the built CSS and the ratios computed.
- **Two places where a wrapped label broke the height promise, both fixed by
  leading.** At the inherited `line-height: 1.6` two 14px lines set to 44.8px and
  pushed the pill to 46.4 (the Neivedhyam CTA at 1200) and 46.8 (`Explore the Lamp
  Lighting Guide` below sm). `line-height: 1.35` sets the same two lines in 37.8px,
  so the box resolves to a flat 44 in both. Separately, `.cta-sm` now states
  `min-height: 44px` and zero block padding instead of leaving the nav button's box
  to padding arithmetic — that arithmetic had produced 44.4 in the bar, 40.9 in the
  sheet (once the leading tightened) and 56.4 before the ≤575.98 rule was given its
  own `.cta-sm` padding.

**The 992–1199.98 band had to stack, and this is the one place the brief's own
requirements collide.** The copy column is 402px at 992. A pill spends 68px on
horizontal padding before the counter (46.6) and arrows (106) take theirs, which
left the label ~114px against the 190 its longest line needs — so it set to
**three** lines and the pill grew to 58.7px, taller than the arrows, breaking both
the 44px height and the row's alignment. Two lines cannot be bought back at that
width by any combination of gap and padding; the arithmetic is ~100px short. So in
that band the CTA takes a line of its own (402.3px wide, one line of label, ending
on the rail) with the counter and arrows beneath, and `--nv-row-h` is re-published
as **110px** (44 + 18 + 48) so the copy column's reservation and the row's pull
still agree. Section height there goes 656.6 → **685.6**.

**8 · Image corners, 16px and 8px.** `--img-radius: 16px` on `.home-page
.img-frame` (Our Story's plate and the Lamp Lighting media), `.home-page
.tile-plinth` and `.home-page .nv-media`; `--img-radius-sm: 8px` on `.home-page
.fest-card-media`, the smallest media on the page and a ~120px side-by-side thumb
below md. Read back as **`16px | 16px | 16px | 8px | 16px`** at all nine widths —
constant across every breakpoint, as asked. Every frame is already
`overflow: hidden`, so the radius clips the photograph and its hover scale; no
second radius on any `img`. **Two deliberate exclusions:** the hero banner reads
**0px** — it is full-bleed and the header dissolves into it, so a corner would
re-draw exactly the boundary point 2 exists to remove — and the closing
photograph, which is clipped to an SVG lotus bloom and has no corners.

**9 · No whitespace was added, except where §3 and §7 forced it.** Document height
is **6337 at 1440** and the section heights are level with or shorter than the
documented ones:

| Viewport | Neivedhyam (was) | Row | Lamp Lighting | doc |
|---|---|---|---|---|
| 320×720 | **1133.3** (1147.3) | 2 lines, 110 | 905 | 9197 |
| 375×812 | **1049.2** (1063.2) | 2 lines, 110 | 930 | 8818 |
| 576×800 | **1096.2** (1102.2) | 1 line, 48 | 941.9 | 8005 |
| 768×900 | **1183.8** (1189.8) | 1 line, 48 | 941.9 | 7872 |
| 992×800 | **685.6** (656.6) | stacked, 110 | 587 | 5367 |
| 1200×800 | **759.6** (759.6) | 1 line, 48 | 700.3 | 5833 |
| 1440×900 | **884.9** (884.9) | 1 line, 48 | 841.4 | 6337 |
| 1600×900 | **923.1** (922.6) | 1 line, 48 | 878.2 | 6539 |
| 1920×1000 | **937.0** (936.5) | 1 line, 48 | 887.2 | 6628 |

Neivedhyam is shorter at four widths, level at three and +0.5 at two; the +29 at
992 is the stacked row above. Our Story is **677.1 at 1440** (677) and the closing
band **480.4** (480). `rowBottom − plateBottom` is **0.00** at 1200 / 1440 / 1600 /
1920, +32.6 at 992 where the reserved copy box is the taller grid item, and
`overlapsNote` is **false** everywhere. The one number that grew is the structural
trailing space between the note and the row: **202.1 at 1440** against 166.1 — the
mechanism is unchanged (see §NEXT TASK and `CLAUDE.md` §8), but Figtree and the
shorter descriptions end the copy higher and the arrows are 6px shorter.

**10 · Responsive.** Everything above was measured at **320 / 375 / 576 / 768 /
992 / 1200 / 1440 / 1600 / 1920**. Zero real horizontal overflow at any of them —
the only `rect.width > innerWidth` hits remain the three documented
`.hero-media` `scale(1.1)` layers. The mobile sheet still fits **738-in-738** at
375×812 with all nine entries, and its `Contact Us` is a 335×44 gold pill. The
video plate is centred in its folded column to the pixel (172.9 / 172.9 at 768).

**Also verified:** `.magnetic` nodes on the homepage still **0**; `[data-anim]`
count still **38** page-wide and the Neivedhyam set still byte-identical
(`fade@0, line@0, fade@0.1, fade@0.14`); the reveal hidden states were hand-driven
because `data-anim-ready` is absent, the documented false pass. A fresh in-page
`error` / `unhandledrejection` / `console.error` / `console.warn` capture over the
reload, the ten slider interactions, the keyboard pair, the video toggle
there-and-back, the mobile sheet and the nav hover returned **zero**. Each new rule
was located by its **nearest enclosing media query** in the minified CSS rather
than by assuming source order: `--nv-row-h: 110px`, the stacked group and
`.nv-cta { flex: 1 0 100% }` inside `(width>=992px) and (width<=1199.98px)`;
`.ll-media { max-width: 360px }` inside `(width<=991.98px)` and `300px` inside
`(width<=575.98px)`; `.cta { white-space: normal; line-height: 1.35 }` and
`.cta-sm { padding: 0 22px }` inside `(width<=575.98px)`; the image-radius rules and
`.cta-sm { min-height: 44px }` at top level.

> **Not verified:** no screenshot — the pane refused to composite all session
> ("the Browser pane is not displayed"), so every geometry number above is
> `getBoundingClientRect()` / `getComputedStyle` with transitions disabled
> (§7.4). The **dish photographs were genuinely looked at** as a Pillow contact
> sheet at the shipped crop (§7.9) — that is what the five were chosen against —
> but the *page* has been measured far more than it has been seen. Specifically
> unobserved: the video actually autoplaying (the pane never permits autoplay; it
> was proven to load, and to play and pause from its chip on demand), the CTAs'
> `:focus-visible` ring (§7.19, new), the scrolled ivory bar as React renders it
> (§7.18 — the discrete-event flush no longer works, so the ivory-bar *CSS* was
> verified by toggling `.nav-over-hero` off and back on instead), the animated
> deep links, and the 0.6s cross-fade between the two bar states.
>
> **Two new gotchas, now `CLAUDE.md` §7.18–19.** The scroll-state flush trick has
> stopped working — `scrollTop = N` moves the document and `dispatchEvent(new
> Event('scroll'))` runs the listener, but no click (hero marker, a marker that
> genuinely sets state, a FAQ facet) commits the pending default-lane update.
> Verify class-scoped states by toggling the class. And real `Tab` presses do not
> move focus at all: `computer{action:'key'}` reports success while
> `document.activeElement` stays on `<body>`, and a programmatic `.focus()` does
> not match `:focus-visible`, so the ring you read is the browser default.

---

## Banner + navigation blending (2026-08-12)

Four-point brief, **homepage banner and navigation only**. **Files changed:**
`Navbar.tsx`, `index.css`. No new file, no asset, no token, no other section, no
inner page, no change to the banner image, the bar's height, its structure, its
order or its positioning. `tsc --noEmit` clean, `npm run build` passes.

**1 · The bar has no surface of its own at the top of the homepage.**

One new state, `.nav-over-hero`, true for **home + unscrolled + sheet closed**.
In it the bar goes `background: transparent`, `border-bottom` transparent,
`backdrop-filter: none`, and the scroll-progress track drops its
`rgba(17,17,17,0.06)` hairline. Four things were producing the hard edge and all
four are gone; measured at rest on the homepage, the only remaining 1px element
in the bar is the gold progress fill, which is **0px wide** at `scrollY: 0`.

`backdrop-filter` had to go, not just soften: a blurred strip ends on the bar's
own bottom edge, which is precisely the line the blend exists to remove.

The scope is deliberate and narrow. `Navbar.tsx` is shared by all five routes and
every inner page opens on `PageHero`'s ivory ground (`#FFFDF7`), where light type
would be stranded — so the state is gated on `currentPage === 'home'`. It is also
gated on `!mobileOpen`, because the sheet is an ivory panel and a transparent bar
with ivory type above it reads as broken.

**2 · The scrim, and why it is not decoration.**

`.nav-scrim` is an absolutely-positioned gradient inside `<nav>`,
`calc(var(--nav-cur) + 96px)` tall, fading `rgba(44,14,4,0.86)` → `0.75` at 55%
of the bar → `0.66` at the bar's foot → **transparent 96px below it**. Ending the
ramp below the bar rather than at its edge is the whole point: there is no line
anywhere for the eye to catch. Reading `--nav-cur` means it follows the bar down
to 84px and 74px instead of drifting off it — measured 208 / 180 / 170px at
desktop / tablet / phone.

**It is also what makes light type legal, and this is the part worth reading.**
The banner behind the bar is not uniformly dark. `cover` anchors the plate
bottom-right, so the *taller* the crop the further down the plate the bar sits:
from about 1600px up, the tops of the agarbatti cartons and the lamp-oil cap rise
into it. The pixels were sampled off the real 1900×1152 plate through the real
`.hero-wash` (both gradients reproduced exactly in Pillow, per breakpoint):

| Under the nav | brightest pixel | ivory bare | ivory scrimmed |
|---|---|---|---|
| 1920 | L 0.936 (near-white cap) | **1.05:1** | **8.24:1** |
| 1600 | L 0.331 | 2.71:1 | 12.91:1 |
| 1440 | L 0.200 | 4.12:1 | 13.94:1 |
| 992 | L 0.171 | 4.67:1 | 13.13:1 |
| ≤768 | L 0.022 | 14.34:1 | 16.86:1 |

So the bare bar fails outright at 1600 and up, and clears 4.5 by 0.4 at 1440.
Three alpha ramps were measured before this one was chosen; **weakening these
values re-opens the wide viewports — recompute against the plate, don't
estimate.** Below 992 the folded `.hero-wash` is already 0.9 dark at the top and
the scrim is nearly redundant there, but it is kept uniform so the treatment does
not change identity across the fold.

**3 · Colour: gold takes over from maroon, and #C9A227 is not usable here.**

`--ink-maroon` is the active-link colour on the ivory bar and stays that way
everywhere else. On the scrimmed banner it measures **1.73:1** — the brief's own
"not on brand preference if it compromises accessibility". `--ink-gold`
(#C9A227) is no better for the star, the underline and the focus ring:
**2.62:1**, under the 3:1 a non-text indicator needs. The banner's own accent
gold **#F5D161** clears both and is already the hero headline's accent, so
nothing new enters the palette.

| Element | Over the banner | Measured (worst pixel) | Floor |
|---|---|---|---|
| Inactive link, ivory 16px | `#FFFDF7` + `text-shadow` | **8.24:1** | 4.5 |
| Active link | `#F5D161` | **5.66:1** | 4.5 |
| Kolam star / underline | `#F5D161` | **4.28:1** | 3 |
| Focus ring | `#F5D161`, 2px @ 3px offset | **4.28:1** | 3 |
| Dropdown caret | ivory @ 0.9 (was 0.45) | **7.05:1** | 3 |
| Hamburger | `currentColor` → ivory | **8.24:1** | 3 |
| CTA label | ivory on its own fill | 8.71:1 | 4.5 |
| CTA **block** | maroon vs banner | **1.13:1** | — |
| CTA ring | `rgba(255,253,247,.55)` | **3.19:1** vs banner, 3.61:1 vs fill | 3 |

Two of those rows are the interesting ones. The caret's 0.45 opacity lived in an
inline style, which outranks every rule — it moved to `.nav-chev` so the
over-hero state could lift it. And the CTA: its *label* is safe anywhere because
it sits on its own maroon fill, but the maroon *block* is 1.13:1 against the
scrimmed cartons at 1920, so the button stops reading as a button. A 1px ivory
ring plus a soft drop restores its edge **inside `.nav-over-hero` only** —
`.cta-solid` itself is untouched, so the shared CTA styling is byte-identical on
every other surface.

**Nothing is carried by colour alone.** The active link keeps the kolam star and
the gold underline it has on the ivory bar, and `Contact Us` still exposes
`aria-current="page"`. Hover still changes no colour in either state — the star
and the drawn-in underline are the entire hover language, by the same reasoning
that kept it that way on the light bar.

**4 · Everything the brief asked to preserve, re-measured.** Links **16px** at
every width. Bar height **112 / 84 / 74** unchanged, `--nav-cur` unchanged, and
the bar does not reflow when the star appears: link left edges read 596.8 / 687 /
816 / 970.6 with a **real cursor** parked on *Lamp Lighting*, against the
documented at-rest 596.4 / 686.5 / 815.6 / 970.1 (0.4–0.5px of scroll rounding,
applied to all four equally). Bar height 113.8 hovered and at rest. CTA
**185.9×48.4**, right edge on the content rail at **1635.2** against a rail of
275.2 → 1635.2 at 1920. Logo on the rail at 84px tall. Menu order, dropdowns and
the nine-entry mobile sheet are untouched; the sheet still fits **738-in-738** at
375×812.

**Verified in the browser.** `tsc --noEmit` clean, `npm run build` passes,
`@layer bootstrap{` still at byte 1086 ahead of `@layer theme{` at 236624, and
all eleven new rules present in the built CSS (the minifier wrote the alphas as
`db`/`bf`/`a8` — 0.859 / 0.749 / 0.659, within 0.001 of the source, and the
contrast table above was recomputed from the *minified* values). With transitions
disabled (§7.4): over the hero the nav reads `transparent` background,
`rgba(0,0,0,0)` border, `backdrop-filter: none`, scrim opacity 1; the hero's own
`#hero` and `.hero-media` both start at `top: 0`, so the banner genuinely runs
under the bar. **The full round trip was exercised on the homepage itself** —
`scrollY: 56` flips the bar to `--nav-cur: 72px`, `rgba(255,253,247,0.92)`, the
ink hairline, the blur, scrim opacity 0, ink hamburger and the progress track
back to `rgba(17,17,17,0.06)` with the gold fill at 6.1px; back at 0 it returns
to the transparent state. **A real `Tab`** lands on *Products* with
`matches(':focus-visible') === true` and an outline of `rgb(245, 209, 97)` — the
gold, not `#C9A227`. **A real cursor** on *Lamp Lighting* flips exactly that
star to opacity 1 / scale 1 in gold while the other three stay at 0 / 0.7.
Opening the mobile sheet at 375 flips the bar back to ivory, the burger to ink
and the scrim to 0, and closing it restores all three. The inner pages are
provably untouched: on `lamp-lighting` the bar reads ivory 0.97, ink links, the
**maroon** active link, the `#C9A227` underline, the maroon star, caret 0.45, ink
burger, no CTA ring and no text-shadow. Zero real horizontal overflow at 375 /
768 / 1920 — the only `rect.width > innerWidth` hits remain the three documented
`.hero-media` scale(1.1) layers. A fresh in-page `error` /
`unhandledrejection` / `console.error` / `console.warn` capture over the reload,
every dropdown hover, the CTA there-and-back, the sheet and the scroll round trip
returned **zero**.

> **Not verified:** no screenshot — the pane refused to composite again ("the
> Browser pane is not displayed"), so every geometry number above is
> `getBoundingClientRect()` / `getComputedStyle`. The *appearance* was
> nevertheless genuinely looked at (§7.9): the real plate, the real `.hero-wash`
> and the shipped scrim were composited in Pillow at 1920 / 1440 / 992 / 768 /
> 375 with the real logo and the nav drawn over them, four alpha ramps side by
> side, and read as PNGs — that is what the alphas were chosen from. It is a
> faithful composite of the same layers, not a browser render. The 0.6s
> cross-fade between the two bar states is unobserved as always (§7.4); both end
> states are real.
>
> **One new gotcha, now `CLAUDE.md` §7.18:** scroll-driven React state never
> commits while the pane is frozen — `setScrolled` is a *default*-lane update
> scheduled through `MessageChannel`, so the bar reads `over-hero` at
> `scrollY: 56` no matter how many microtasks you flush. `document.
> documentElement.scrollTop = N` moves the document where `scrollTo()` does not,
> and a **discrete** event flushes the pending commit — clicking the already-
> current hero slide marker returns early in `goTo`, so it commits React without
> changing anything. Without that trick the scrolled bar cannot be verified here
> at all.

---

## Neivedhyam: Rava Pongal, top-aligned plate & split control row (2026-08-12)

Six-point brief, **homepage only**, and only the Neivedhyam section. **Files
changed:** `NeivedhyamSection.tsx`, `index.css`. No new file, no local asset, no
token, no colour, no other section, no inner page. `tsc --noEmit` clean,
`npm run build` passes.

**1 · Thiruvannamalai Pongal → Rava Pongal, content and photograph.**

| Field | Was | Now |
|---|---|---|
| `type` (category) | Rice Offering | **Semolina Offering** |
| `name` | Thiruvannamalai Pongal | **Rava Pongal** |
| `desc` | Sweet Pongal with jaggery, cashews, and cardamom … pot overflows … | **Roasted semolina simmered with moong dal and ghee, tempered with pepper, cumin, and cashews — a swift, fragrant offering for the lamp.** |
| `note` | Offered at dawn · Karthigai month | **Offered at dawn · Tempered in ghee** |
| `image` | `photo-1732603891196-2b8cc24f39a5` (the ritual pot boiling over on a kolam) | **`photo-1630409349416-24884761a307`** |

No "Thiruvannamalai" or "Pongal-with-jaggery" string is left in the section — the
slide is the savoury semolina offering top to bottom, and the old slide's ritual
pot is gone with it. Note the set's coverage argument shifts slightly: the five
slides used to be rice / sweet / dumpling / savoury / drink, and the rice offering
is now a semolina one. (`FestivalCustomsPage.tsx` still lists *Thiruvannamalai
Sweet Pongal* under Karthigai Dheepam — a different page, explicitly out of scope,
and correct in its own context.)

**The photograph was audited, not trusted** (`CLAUDE.md` §6). Unsplash has no
photo of rava pongal by name; the search endpoints answer 401 to `urllib`, so
candidates came via `WebFetch` on the search pages then each photo page's
`og:image`, across eight queries (ven pongal, pongal, pongal food, upma, rava
upma, khichdi, semolina, semolina porridge, sooji, south indian breakfast). Two
promising ones were **Unsplash+ `premium_photo-`** and were dropped. Eight free
candidates were then tiled at the crop the slide actually ships and read as PNGs:
bright turmeric *rice* pilaf (twice — visibly rice grains, wrong for semolina),
sabudana khichdi (tapioca pearls), a dosa, an idli thali, coconut rice with
cashews, and a pale sweet in a small bowl were all rejected. The winner is a
soft, ghee-glossy pongal in a white bowl, cumin-tempered and finished with
coriander, shot close on wood with dal beside it — checked again at all three
shipped crops (674×505 desktop 4:3, 732×488 tablet 3:2, 280×187 phone 3:2), warm
in all of them and matching the other four slides' close-crop character.
**Stated plainly: the semolina grain itself is not resolvable at this crop**, and
that is exactly why a pongal-textured plate reads true here rather than a
mislabelled one; there is no free photograph of rava pongal to be had.
The URL goes through the section's existing `?w=…&h=…&fit=crop&auto=format`
pipeline untouched (it serves 200, `content-length` 289,120, decodes 883×736).

**2 · The plate and the copy column are top-aligned.** `.nv-grid` goes
`align-items: center → start` and `.nv-copy` `align-self: end → start`. Measured
`plateTop − copyTop` = **0.00 on all five slides** at 992 / 1200 / 1280 / 1440 /
1600 / 1920; neither column carries any top margin. Centring had put the copy
**132px** below the plate's top at 1440 and, in the 992–1199.98 band where the
reserved copy box is the taller item, had left clear space *above* the plate.

**3 · The control row is split: CTA left, counter and arrows right.**
`.nv-controls-group` goes `justify-content: flex-end → space-between`, and
`.nv-controls-nav` gains `margin-left: auto`. Both are needed — see the gotcha
below. Measured at all ten widths: `ctaLeft − copyLeft` = **0.00**,
`navRight − contentRail` = **0.00** (−0.01/−0.02 scroll rounding at ≥1440). The
CTA keeps its `variant="line"` styling untouched: 14px full caps, the drawn-in
underline, the translating arrow, `--cta-h`'s 52px box (293.4×52 at ≥1280,
274.4×52 at 1200, 201.2×52 at 992 — the documented two-line label inside the same
box). Row height is **54px, one line, at every width from 576 up**.

**4 · Controls are `01 / 05` + prev + next and nothing else.** Already true since
2026-08-12 and re-verified: `nv-dots` / `nv-dot{` / `nv-count-name` are all absent
from the built CSS and **zero** dot nodes exist on the page at any of the ten
widths. Tab order in the row is CTA → prev → next.

**5 · Why there is space under the note, and why it cannot be closed.** This is
the one thing worth reading. `.nv-controls` is a sibling *below* `.nv-viewport`,
and the viewport is as tall as the plate — so **the row's top can never rise above
the plate's bottom edge minus the row's own height.** Pull it higher and
`.nv-slider` computes shorter than the viewport inside it, the plate spills past
the section's content box, and `.section { overflow: hidden }` clips it. With the
columns top-aligned (point 2) and the plate the taller item, the trailing space in
the copy column is therefore structural: **166px at 1440** (180 at 1600, 176 at
1920, 110 at 1280, 81 at 1200, 27.8 — i.e. exactly `--nv-row-gap` — at 992, 24 at
every folded width). It is *not* fixable by measuring the copy in JS and pulling
the row: each slide's note ends at a different height (166 / 196 / 196 / 196 / 196
at 1440), so one pull would either orphan four slides or ride into a note. The
only real levers are the plate's 4:3 ratio or the `1.15fr 1fr` column split, both
of which the brief ruled out — flagged under §NEXT TASK as a decision.

The reservation construction from the previous session stays and is what keeps the
row exact: the copy column reserves `--nv-row-h + --nv-row-gap` and the row is
pulled back up by `--nv-row-h`, so `rowBottom − plateBottom` = **0.00** at 1200 /
1280 / 1440 / 1600 / 1920 and **+3.56** at 992, where the reserved copy box is the
taller grid item and the note-to-row gap collapses to the gap token. `overlapsNote`
is **false on all five slides at all ten widths**.

**6 · Responsive.** Folded (≤991.98) the row still moves back to `grid-column: 1`
and both halves land on the content rail exactly (`ctaLeft − rail` = 0,
`navRight − rail` = 0 at 320 / 375 / 576 / 768). Below sm the group wraps to two
lines — CTA full width on line 1, now **left**-aligned with the copy above it
(label starts at the box's left edge, `text-align: left`), counter and arrows on
line 2 still closing on the rail — row 124px (52 + 18 + 54), which is the same
two-line row as before, just mirrored to match the new left/right split.

**The section is shorter or level at every width** — no whitespace was added:

| Viewport | Section (was) | Row | note → row | rowBottom − plateBottom |
|---|---|---|---|---|
| 320×720 | **1147.3** (1173.1) | 2 lines, 124 | 24 | n/a (folded) |
| 375×812 | **1063.2** (1105.0) | 2 lines, 124 | 24 | n/a |
| 576×800 | **1102.2** (1102.4) | 1 line, 54 | 24 | n/a |
| 768×900 | **1189.8** (1190.3) | 1 line, 54 | 24 | n/a |
| 992×800 | **656.6** (707.2) | 1 line, 54 | 27.8 | +3.56 |
| 1200×800 | **759.6** (767.5) | 1 line, 54 | 81.2 | 0.00 |
| 1280×800 | **801.4** (802.0) | 1 line, 54 | 109.5 | 0.00 |
| 1440×900 | **884.9** (885.5) | 1 line, 54 | 166.1 | 0.00 |
| 1600×900 | **922.6** (922.6) | 1 line, 54 | 180.2 | 0.00 |
| 1920×1000 | **936.5** (937.0) | 1 line, 54 | 175.7 | 0.00 |

The 50px drop at 992 and the ~30px drops at 320/375 are the **content** change,
not the layout: "Thiruvannamalai Pongal" wrapped to two lines of 48px Fraunces in
a narrow column and "Rava Pongal" does not. The new description was deliberately
trimmed to the length of the four it sits beside — the first draft was 13
characters longer and took an extra line in the folded column, which put 768 at
1216.8 instead of 1189.8.

**Verified:** `tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{`
still at byte 1086 ahead of `@layer theme{` at 236624. In the built CSS
`.nv-grid{…align-items:start…}` is top level, `.nv-copy{align-self:start;…}` and
the row's negative margin are inside `@media (width>=992px)`,
`.nv-controls-group{…justify-content:space-between…}` and
`.nv-controls-nav{…margin-left:auto…}` are top level, the 16px step is inside
`(width>=992px) and (width<=1199.98px)`, and `grid-column:1` + the wrap +
`.nv-cta{text-align:left;flex:1 0 100%;justify-content:flex-start}` are inside
`(width<=991.98px)` / `(width<=575.98px)` — located by walking to each rule's
nearest enclosing query, not by assuming the minifier kept source order. Zero real
horizontal overflow inside the section at any of the ten widths. The slider is
fully functional: five `next` clicks and five `prev` clicks track the counter
01→05→01 with the slide names (`Rava Pongal` first), both ends clamp against a
sixth click, `ArrowRight`/`ArrowLeft` do the same, a synthetic 40%-width drag
advances the slide, and the CTA is a single enabled `<button>` that hit-tests at
its own centre with **0** CTAs left inside the track. The section's reveal set is
byte-identical (`fade@0, line@0, fade@0.1, fade@0.14`, 38 `[data-anim]` elements
page-wide) and the slider's fade was hand-driven to prove it (opacity 0 →
`progress(1)` → 1) since `data-anim-ready` is absent — the documented false pass.
`.magnetic` nodes on the homepage: still **0**. A fresh in-page `error` /
`unhandledrejection` / `console.error` / `console.warn` capture over all of the
above returned **zero**. No colour or type token was touched, so no contrast
recompute was needed.

> **Not verified:** no screenshot — the pane refused to composite again ("the
> Browser pane is not displayed"), so every number above is
> `getBoundingClientRect()` / `getComputedStyle`. The **photograph was genuinely
> looked at** (Pillow contact sheets at the real crops, `CLAUDE.md` §7.9), and the
> finished arrangement was plotted to scale from the measured rects with the real
> plate composited in and read as a PNG — that confirms the composition matches
> the brief, but it is a plot plus a photo, not a browser render. The CTA's
> animated deep link to `#neivedhyam-dishes` is unobservable here as always; the
> handler and destination are untouched. The drag-then-click guard was exercised
> as a drag only, since nothing interactive sits inside the track.
>
> **One new gotcha, now `CLAUDE.md` §7.17:** exercising the arrows or a drag
> leaves the track parked **mid-tween** (`settle()`'s 0.85s `gsap.to` needs rAF),
> so afterwards every element inside a slide reads back horizontally offset —
> `.nv-media` at `x: −484` where it belongs at 49 — and every rail comparison
> silently fails. Vertical numbers survive; reload before measuring left/right,
> and check `getComputedStyle(track).transform` is the identity matrix.

---

## Neivedhyam control row → the copy column (2026-08-12)

One-point brief, **homepage only**, and only the Neivedhyam section. **Files
changed:** `index.css`, `NeivedhyamSection.tsx` (a comment). No new file, no
asset, no copy, no type, no colour, no other section, no inner page.

**What moved.** `.nv-controls-group` goes from `grid-column: 1` to
**`grid-column: 2`**. `.nv-controls` still repeats `.nv-grid`'s track definition
(`1.15fr 1fr` + the same gap), so column 2 resolves to exactly the copy column
and the row lands under the description on the container's **content rail**
instead of on the image's right edge. Measured `groupRight − copyRight` = **0.00**
and `groupRight − contentRail` = **0.00** at 320 / 375 / 576 / 768 / 992 / 1200 /
1280 / 1440 / 1600 / 1920, and — because all five slides share one grid — each
slide's copy right edge sits **1332.08** from its own left edge against the
group's 1332.08 from the slider's, so the rail holds for all five, not just the
settled one. Above 992 the CTA's left edge clears the image by 10.8px at 1280,
71.6 at 1440, 163.8 at 1600 and 82.5 at 1920 (at 992–1200 the group fills the
column exactly, so it starts on the column's own left edge); nothing in the row
ever overlaps the plate.

**Closing the 144px void — the part worth reading.** The row cannot live *inside*
a slide: there is one row for five slides and it must not travel with the track,
so it renders below the viewport. But the copy it now belongs to is centred
against a much taller image, which left the CTA hanging **144.2px** below the
note at 1440 — the opposite of what the brief asked for. So `.nv-copy` **reserves
the row's height plus its gap** (`padding-bottom: calc(var(--nv-row-h) +
var(--nv-row-gap))`, with `align-self: end`) and `.nv-controls` is pulled back up
by exactly the height it reserved (`margin-top: calc(-1 * var(--nv-row-h))`).
Both at ≥992px only; both tokens are published on `.nv-slider` so the row and the
column above it cannot disagree.

Three results, all measured: the note-to-CTA gap is `--nv-row-gap` at every width
(**34** at 1280/1440/1600/1920, 33.6 at 1200, 27.8 at 992), the row's bottom lands
**exactly on the image's bottom edge** (`rowBottom − imageBottom` = 0.00 at 1280 /
1440 / 1600 / 1920; +3.6 at 1200 and +26.9 at 992, where the reserved copy box is
the taller grid item and defines the row instead), and the copy barely moves —
its top offset inside the image band goes 110.2 → **132.4** at 1440, i.e. 22px
lower, so it still reads as centred. It is safe in both directions: the
reservation sits immediately above the row, so whichever of image or copy is
taller, the row fills the space set aside for it and can never ride up into the
note (`noteOverlap: false` on all five slides at 992 and at 1440).

**The narrow band needed one adjustment.** Column 2 is the narrower track, so the
squeeze starts at ~1270px rather than 1200: the group wants ~515px against 586 at
1440, 521 at 1280, 488 at 1200, 402 at 992. From 1280 down the CTA takes its
documented second line of label inside the 52px box — measured 293.4px wide and
52 tall at 1280 and above, 274.5×52 at 1200, 201.4×52 at 992, so it is **never
three lines and the row is 54px tall at every width from 992 up**. At the default
19.8px steps 992 left the CTA only ~197px of a 402px column against the 190 it
needs for two lines, which is no margin for a wider scrollbar, so the
**992–1199.98 band takes a flat 16px step** on both `.nv-controls-group` and
`.nv-controls-nav` (~205px). Folded (≤991.98) the group is moved **back to
`grid-column: 1`** — left in column 2 it would have created an implicit second
track — and below sm it still wraps to two right-aligned lines (row 124px:
CTA 52 + 18 + arrows 54), both ending on the rail.

**The section got shorter everywhere it changed, and folded is untouched:**

| Viewport | Section (was) | Row rows | group right = copy right = content rail |
|---|---|---|---|
| 320×720 | 1173.1 (1173.1) | 2 | 300 |
| 375×812 | 1105.0 (1105) | 2 | 355.2 |
| 576×800 | 1102.4 (1102.4) | 1 | 556 |
| 768×900 | 1190.3 (1190.3) | 1 | 732.3 |
| 992×800 | **707.2** (735) | 1 | 948.7 |
| 1200×800 | **767.5** (847) | 1 | 1149.6 |
| 1280×800 | **802.0** | 1 | 1226.9 |
| 1440×900 | **885.5** (973) | 1 | 1381.4 |
| 1600×900 | **922.6** (1011) | 1 | 1481.4 |
| 1920×1000 | **937.0** (1025) | 1 | 1635.2 |

**Verified:** `tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{`
still at byte 1086 ahead of `@layer theme{` at 236624. In the built CSS
`grid-column:2` on `.nv-controls-group`, the `.nv-copy` reservation and
`.nv-controls`' negative margin are inside `@media (width>=992px)`, the 16px step
inside `(width>=992px) and (width<=1199.98px)`, and `grid-column:1` inside
`(width<=991.98px)` — checked by locating each rule's nearest enclosing query, not
by assuming the minifier kept my order. `nv-dots` / `nv-dot{` are still absent.
**Zero pagination dots** on the page at all ten widths and zero real horizontal
overflow in the section at any of them. The slider is fully functional: clicking
`next` five times and `prev` five times tracks the counter 01→05→01 with the
slide names, both ends clamp against a sixth click, `ArrowRight`/`ArrowLeft` do
the same, a synthetic 40%-width drag advances the slide, the CTA is a single
enabled `<button>` in the control row that hit-tests at its own centre (nothing
overlays it), and tab order in the row is CTA → prev → next. A fresh in-page
`error` / `unhandledrejection` / `console.error` / `console.warn` capture over all
of that returned **zero**. Colours, type and the section background were not
touched, so no contrast recompute was needed.

> **Not verified:** no screenshot — the pane refused to composite again ("the
> Browser pane is not displayed"), so every number above is
> `getBoundingClientRect()` / `getComputedStyle`. To actually *look* at the
> arrangement, the measured rects were plotted to a to-scale PNG with Pillow and
> read (§7.9); that confirms the layout matches the brief's marked area but it is
> a plot of geometry, not a render. The CTA's animated deep link to
> `#neivedhyam-dishes` is unobservable here as always — the handler and
> destination are untouched — and the drag-then-click guard was exercised as a
> drag only, since nothing interactive is inside the track.
>
> **One new gotcha, now in `CLAUDE.md` §7.16:** `gsap.set(el, { clearProps:
> 'all' })` strips React's JSX inline styles too. Using it to clear the frozen
> copy-reveal tween deleted three `marginBottom`s and the lead's `maxWidth: 440`
> and shrank the copy column 82px mid-measurement. The frozen state also made the
> 34px gap read as **12** (`.nv-copy`'s tween starts at `y: 22`) — that was the
> tween, not the layout.

---

## Imagery, nav CTA, slider group & footer (2026-08-12)

Five-point brief, **homepage only**. **Files changed:** `BrandStory.tsx`,
`ProductsShowcase.tsx`, `FestivalsSection.tsx`, `Navbar.tsx`,
`NeivedhyamSection.tsx`, `Footer.tsx`, `index.css`; **new:**
`tools/build-section-plates.py`, `src/imports/our-story.webp`,
`src/imports/products/agarbatti-scene.webp`; **deleted:**
`src/imports/story-dheepam.webp`, `src/imports/products/agarbatti.png`.
No inner page was opened.

**1 · Our Story plate → the supplied `Images/Our Story.png`.**

52.1KB WebP at **520×557**, which is 14:15 to within a pixel and *exactly* the
CSS size of the desktop frame (`--story-plate-max: 520px`). So it decodes with
zero crop, and the `width`/`height` attributes and `sizes` came down to match.

**The ≤991.98px 4:3 flatten is gone** — the plate keeps 14:15 at every width.
That flatten dated from when the frame ran the full container rail, where a
near-square measured ~900px tall on a tablet; the 520px cap already solved that.
And this plate cannot afford the crop: the oil bottle spans 78% of the frame
height, so a 4:3 window clips its cap at every `object-position` that keeps the
base — checked by rendering the bottom / centre / 30% / 7:6 / 5:4 crops to a
contact sheet and looking at them, not by eye. `object-position: center bottom`
went with it, since there is no longer an overflow for it to bias.

That costs the folded steps image height and it is the one place the page grew:
Our Story is **1249 at 576** (was 1090), **1223 at 768** (was 1064), 1185 at 320
(was 1103), 1186 at 375 (was 1087). Desktop is unchanged — **677 at 1440** against
678 — and the single-fold rule still holds against the scrolled bar at every step,
**including the binding 1366×768 case: 671.44+94 = 765.44 ≤ 768** (677+94=771 ≤ 900
at 1440; 679+94=773 ≤ 800 at 1200; 681+94=775 ≤ 800 at 992).
The plate centres exactly in its folded column (plate centre 379.00 = column
centre 379.00 at 768) and still lands on the content rail above 992 (plate right
= shell content right: 1149.2 at 1200, 1381 at 1440, 1480.61 at 1600, 1635 at
1920).

**Note the resolution trade.** The old plate was 1400×1500; this one is 520×557,
because that is the whole of what was supplied. It is a 1x asset on a 520px frame
and will read soft at 2× DPR. Flagged under §NEXT TASK rather than papered over
with an upscale.

**2 · Agarbatti tile → the supplied `Images/Agarbatti.png`, as a *scene*.**

147KB WebP at **1400×646** — deliberately byte-for-byte the same decode size as
`lamp-oil-scene.webp`, because the two are companion shots: same gold backdrop,
same brass kuthuvilakku, same flower bowl, same light. Verified by tiling both at
the real desktop, tablet and phone tile sizes and looking at the pair.

The treatment had to change with it. The old asset was a **cut-out packshot** on
the painted `.tile-plinth`; the new one is a full set photograph, and composing
that onto the plinth would have put a photographed background inside a painted
one. So it carries `scene: true`, which is the flag that already existed for the
Lamp Oil tile — `.tile-scene` fills the frame, `.tile-ground`'s contact shadow
and the plinth gradient drop out, and `.is-scene` keeps the native 13/6 on
phones. Source ratio is 2.1618:1 against 13:6's 2.1667, so framing is a **2px
height trim**: resize to 1400 wide → 647, centre-crop to 646. Both tiles measure
identically at every width (648.8×299.4 at 1440, 660×304.6 at 1920, 539.8×249.1
at 1200, 445.4×205.6 at 992, 342.9×158.3 at 768, 258×119.1 at 576, 280×129.2 at
320) and both images decode at 1400×646.

**`products` is now a typed array.** With no product carrying `shot`, `p.shot`
stopped type-checking. The packshot branch is *typed* rather than deleted — a
`Product` interface with `scene?`/`shot?` optional — because `.tile-shot` /
`.tile-ground` and the three cut-outs still in `imports/products/` are the
documented alternative treatment and a future cut-out SKU should not have to have
it rebuilt. It is dead code today; §Backlog says so.

**3 · Diwali card → a real Diwali photograph.**

`photo-1635192592106-77a5aacbe1a3` — a flower kolam ringed with lit clay diyas,
shot from above. The old `photo-1702505433756-88130191bb4b` was a brass
kuthuvilakku being lit against a **teal** wall: a fine devotional image, but it
read as Karthigai — the card *directly beside it* — and it was the only non-warm
photograph on the homepage.

Picked the CLAUDE.md §6 way: four candidates downloaded at the exact 900×675 crop
the card ships, tiled with labels into one PNG and read. Three of the four did not
show what their alt text claimed (Unsplash's `napi` search endpoint now 401s, so
candidate IDs came via the photo pages; several promising ones turned out to be
Unsplash+ `premium_photo-` assets and were dropped). The winner was then rendered
beside the two existing cards at real card size to confirm the trio reads as one
family. Card geometry is untouched (421×316 at 1440) and the `srcSet`'s
`w=900&h=675` → `w=600&h=450` rewrite still applies.

**4 · Nav: active link in brand maroon, and Contact Us as a CTA.**

*Active colour.* One rule — `.nav-link[data-active='true'] { color:
var(--ink-maroon) }`. **8.71:1** on the bar's ivory against the inactive link's
18.56:1: a step down in weight, not into low contrast, and it is already the
colour of the kolam star sitting two pixels to its left, so the active link reads
as one maroon unit. **Hover is untouched by design** — it was never a colour
change (the gold underline and the star are the whole hover language) and giving
it one would leave the active state nowhere to go.

*Contact Us.* Lifted out of the text-link row and rendered with the site's own
`<Button variant="solid" size="sm">`, via a new `cta: true` flag on the `navLinks`
entry. Nothing about the CTA is new: `.cta.cta-solid.cta-sm` supply the
typography (Inter, 14px, 600, 1.4px tracking, uppercase), the square corners, the
maroon fill, the ivory label, the arrow and the hover — measured under a **real
cursor**, the fill flips to `#111` (18.56:1) and the arrow translates 6px, which
is the shared `.cta:hover .cta-arrow` tween. Box is **185.9×48.4** at every
desktop width, padding 13/24, and the bar does not reflow on hover (the four
remaining link left edges read 596.4 / 686.5 / 815.6 / 970.1 hovered and at rest).
`.nav-cta` adds exactly two things: `flex-shrink: 0`, because the bar is a flex
row and `.cta`'s `nowrap` would otherwise let the label spill, and the full-width
sheet variant below. `--cta-h` is *not* in play — that token is scoped to
`.home-page` / `.closing` — so the box is padding-driven, which is what keeps it
comfortable in a bar that is 74–112px tall.

The bar still fits everywhere: link row 734.5 wide inside 924 at **992** (logo
ends at 98, the row starts at 213.8), 757.8 at 1200, 784.7 at 1440, 791.4 at 1600
and 1920. The **mobile sheet** gets the same button, full width across the
content rail (335 wide, 20 → 355 at 375px) and centred, with the hairline dropped
so it sits clear of the heading stack rather than inside it — the sheet still fits
738-in-738 at 375×812 with all five entries and both sub-lists. No star and no
gold underline on the CTA in either place; `aria-current="page"` carries the state
instead, and it does flip on the contact page.

**5 · Neivedhyam: CTA + counter + arrows as one right-side group.**

The CTA moved out of each slide's copy column and into `.nv-controls-group`,
first in source order, so the row reads **CTA · `01 / 05` · ← · →** with a single
spacing step (`clamp(18px, 2vw, 28px)`) between all three. That also collapses
five identical buttons — one per slide, four of them in an `aria-hidden`
container needing `tabIndex={-1}` — to the one instance the section always meant
to have (`.nv-track .cta` is now **0**). The counter and arrows gained a
`.nv-controls-nav` wrapper so they can never be split from each other.

The alignment construction is unchanged and still exact: `.nv-controls` repeats
`.nv-grid`'s track definition, so column 1 resolves to the media column. Measured
`groupRight − mediaRight` = **0.00 at every one of the nine widths** — 300 /
355.2 / 556 / 731.89 / 496.38 / 601.56 / 722.95 / 802.17 / 961.78 — and, because
all five slides share one grid, each slide's media right edge sits **674.00** from
its own left edge against the group's 674.00 from the slider's, so the rail holds
for all five and not just the settled one.

**`flex-wrap: nowrap` on the group is load-bearing.** Flexbox breaks lines
*before* it shrinks items, so with `wrap` on, the **992–1199.98** band pushed the
counter and arrows onto a second row — the group wants ~496px against a 463px
media column there. `nowrap` forces the squeeze onto the CTA instead, which
absorbs it by taking a second line of label (`.nv-cta { white-space: normal }`,
overriding `.cta`'s `nowrap`) inside its existing 52px `--cta-h` box: two 14px
lines set to 44.8px, so **the row stays exactly 54px tall — the height of the
arrows — at every width from 576 up**. The wrapped label costs the underline
nothing: it lands **2.8px under the second line's baseline**, and the label is
full caps so there are no descenders to cross. Below sm, wrapping comes back on
deliberately (the label's longest word plus its arrow needs ~150px of the ~100px
that would be left) and the CTA takes the whole first line, right-aligned, with
the counter and arrows 18px beneath — both lines still ending on the image's
right edge.

**The section got shorter or stayed level at every width**, because the height the
CTA stopped taking in the copy column is the height it now takes in the control
row:

| Viewport | Neivedhyam (was) | Group rows | Group right = image right |
|---|---|---|---|
| 320×720 | 1173 (1173.1) | 2 | 300 |
| 375×812 | 1105 (1105) | 2 | 355.2 |
| 576×800 | **1102** (1172.4) | 1 | 556 |
| 768×900 | **1190** (1260.3) | 1 | 731.89 |
| 992×800 | **735** (777.4) | 1 | 496.38 |
| 1200×800 | 847 (847.8) | 1 | 601.56 |
| 1440×900 | 973 (972.9) | 1 | 722.95 |
| 1600×900 | 1011 (1011.1) | 1 | 802.17 |
| 1920×1000 | 1025 (1025) | 1 | 961.78 |

`.nv-viewport`'s pointer handlers, `suppressClick` and the capture-phase click
guard are all **untouched and kept**, even though nothing interactive is left
inside the track — the mechanism is what CLAUDE.md §8 asks for and the next
in-track link should not have to rediscover it. A synthetic drag still advances
the slide and raises no error.

**6 · Footer rebuilt to mirror the header menu.**

`Navbar.tsx`'s `navLinks` is Home · Products (Lamp Oil, Agarbathi) · Lamp
Lighting · Festivals & Traditions (Festival Customs, Neivedhyam Dishes &
Recipes) · Contact Us. Every one of those now appears in the footer at the level
it has in the bar, in **four columns** — which is what `.col-footer-links`
(`span 2` × 4 + the brand's `span 4` = 12) requires, so the grid, the tablet
2-up fold and the phone stack are all unchanged:

| Column | Items |
|---|---|
| **Menu** | Home · Products · Lamp Lighting · Festivals & Traditions · Contact Us |
| **Products** | Lamp Oil · Agarbatti · Shop All Products |
| **Festivals & Traditions** | Festival Customs · Neivedhyam Dishes & Recipes |
| **Engage** | Test Your Knowledge · FAQ |

*Removed as outdated:* the four items under the old `Lamp Lighting` heading —
*Why We Light Lamps*, *Benefits*, *Auspicious Days*, *Traditional Practices*.
None was ever a menu item and all four resolved to the same `lamp-lighting` page
as the heading above them, so the column advertised one destination five times.
*Festival Overview* went the same way: `#festivals` is reached by the nav's own
`Festivals & Traditions` entry, which is in `Menu` now.

*Repointed:* *Neivedhyam Dishes & Recipes* used to scroll to the homepage
`#neivedhyam` slider; the nav sends it to the dishes block on the Festival
Customs page. It now matches the nav, so `handleLink` gained the same optional
`anchor` + 260ms deferral the nav's dropdown uses.

*Kept although neither is a menu item:* **Shop All Products**, the footer's only
route to the store, and the two `Engage` entries — the Knowledge page's only
other entrance is the sticky launcher and the FAQ has none at all. Dropping them
would have deleted reachability, not clutter.

**All twelve links were clicked and their destinations checked**: Home /
Products / Festivals & Traditions / Lamp Oil / Agarbatti / FAQ land on the
homepage with `#products`, `#festivals`, `#faq` present; Lamp Lighting → the
guide page; Contact Us → the contact page; Festival Customs and Neivedhyam →
the Festival Customs page with `#neivedhyam-dishes` present; Test Your Knowledge
→ the knowledge page; and **exactly one** external open fired,
`https://kaleesuwari.com` from Shop All Products.

**Verified:** `tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{`
still at byte 1086 ahead of `@layer theme{` at 236624. `nv-dots`,
`quiz-fab-badge`, `hero-cue-label` and `object-position:center bottom` are all
absent from the built CSS. Zero real horizontal overflow at 320 / 375 / 576 / 768
/ 992 / 1200 / 1440 / 1600 / 1920 — the only `rect.width > innerWidth` hits remain
the three documented `.hero-media` scale(1.1) layers. Reveal sets are
byte-identical on every changed section (`brand-story` `fade@0, line@0, fade@0.1,
fade@0.16, fade@0.2, mask@0`; `neivedhyam` `fade@0, line@0, fade@0.1, fade@0.14`;
38 `[data-anim]` elements as before), confirmed by hand-driving the hook's own
tweens since `data-anim-ready` is absent on all of them — the plate's `mask`
hides at `inset(0 0 100%)` and clears at `progress(1)`, the slider's fade 0 → 1.
The slider counter tracks 01→05 and back, both ends clamp against a sixth click,
and `ArrowRight`/`ArrowLeft` do the same. A fresh in-page `error` /
`unhandledrejection` / `console.error` / `console.warn` capture over the slider
run, a synthetic drag, the nav CTA there-and-back, every dropdown hover and all
twelve footer links returned **zero**. Contrast computed: nav active 8.71:1, nav
CTA label on fill 8.71:1 and 18.56:1 hovered, slider CTA 15.29:1 and counter
4.65:1 on the `#F4E6C8` band, arrow border 3.92:1, footer links 11.17:1.

> **Not verified:** no screenshot. The pane refused to composite for the whole
> session ("the Browser pane is not displayed"), so every geometry number above is
> `getBoundingClientRect()` / `getComputedStyle` and every contrast number is
> computed. Two consequences. First, **the imagery genuinely was looked at** — all
> three plates and every crop the CSS applies were composited to PNGs with Pillow
> and read (CLAUDE.md §7.9) — but nothing was seen *in situ*. Second, lazy images
> never start loading without a compositor, so the Lamp Oil tile read as
> `0×0 PENDING` until forced; both tile assets then decoded at 1400×646 and both
> serve 200. The animated deep-link scroll from the relocated slider CTA is
> unobservable here as usual (§Gotchas); the handler and destination are unchanged.

---

## Nav star & slider controls (2026-08-12)

Two-point brief, **homepage only**. **Files changed:** `Navbar.tsx`,
`NeivedhyamSection.tsx`, `index.css`. No new file, no inner page opened, no
asset touched, no token added.

**1 · Nav links are 16px and carry the kolam star on hover / active.**

`.nav-link` moves from `--fs-body-sm` (14) to `--fs-body` (**16px**), which is
16 at every breakpoint — the desktop bar only exists ≥992 anyway. The bar is now
the one UI surface deliberately above the 14px the CTAs use.

The mark is `EyebrowStar` — the same component the six homepage eyebrows carry —
wrapped in a new `.nav-star` span, **with no eyebrow text beside it**. Two
decisions worth keeping:

- **It is absolutely positioned (`right: 100%; margin-right: 4px`), not in the
  flex flow.** In-flow it would either reflow the whole row on hover or cost
  every link 17px of permanent padding; out of flow, the bar's geometry is
  byte-identical at rest and on hover. Measured under a *real* cursor on "Lamp
  Lighting": the five link left edges are 692 / 782.2 / 911.2 / 1065.8 / 1290.8
  hovered, against 691.6 / 781.8 / 910.8 / 1065.4 / 1290.4 at rest — the 0.4px
  is scroll rounding, applied to all five equally. It lives in the inter-link
  gutter (`clamp(24px, 2.8vw, 42px)`, 27.8px at 992) and occupies 17 of it, so
  the nearest it ever comes to the previous label is **23.3px**.
- **Maroon, not gold.** Gold is what the underline uses and was the first
  instinct, but `--ink-gold` measures **2.38:1** on the bar's ivory — fine for a
  hairline, too faint for a mark the brief wants seen. `--ink-maroon` is
  **8.71:1** and is literally the eyebrow's own treatment (gold hairline, maroon
  star, maroon label).

Hidden state is `opacity: 0` + `scale(0.7)`, shown at 1/1 over 0.35/0.45s; the
global `prefers-reduced-motion` block at the foot of `index.css` already
neutralises the transition. `.nav-star .eyebrow-star { margin-right: 0 }` undoes
the −4px pull that is tuned for the eyebrow's hairline gap.

Verified at 1440: all five links **16px**, all five carry a star, the active one
(Home) renders at opacity 1 / scale 1 / 13px with a 4px gap to its label and
`vCentreDelta 0`, and a real hover on Lamp Lighting flips exactly that one to
opacity 1 while the other four stay at 0. No eyebrow text anywhere in the bar.
**The mobile sheet is untouched** — the star markup is desktop-only, the sheet's
entries still render at 24px, and it still fits 738-in-738 at 375×812.

*Note on scope:* `Navbar.tsx` is shared by all five routes, so 16px links and
the hover star reach the inner pages by construction — the same situation as
`Footer.tsx` and `.closing` (§Gotchas). There is no page-aware hook for the bar
and the brief asked for the navigation itself.

**2 · Slider controls: `01 / 05` + two arrows, on the image's right edge.**

Removed: **all five pagination dots** (`.nv-dots`, `.nv-dot`, `.nv-dot.is-active`
and the JSX that rendered them) and `.nv-count-name`, the active offering's name
that trailed the counter — the brief asked for the number and the arrows and
nothing else. Both are absent from the built CSS.

The alignment is the interesting part. The group used to close on the
**container's** content rail, directly under the slide CTA. It now closes on the
**image's** right edge, and it does that by construction rather than by offset:
`.nv-controls` stops being a flex row and **repeats `.nv-grid`'s own track
definition** (`1.15fr 1fr`, `gap: clamp(32px, 5vw, 76px)`), with
`.nv-controls-group` placed in column 1 and justified to the end. `.nv-controls`
is a sibling of `.nv-viewport` at identical width, so column 1 resolves to
exactly the media column. Measured `groupRight − mediaRight` = **0.00 at every
one of the eight widths** — 320 / 375 / 576 / 768 / 992 / 1200 / 1440 / 1600 /
1920 → 300 / 355.2 / 556 / 732.3 / 496.6 / 601.8 / 723 / 802.4 / 962. If the
slide grid is ever retuned, the controls follow it.

Folded (≤991.98) `.nv-controls` goes to `1fr` with the grid, so the group still
ends on the image — which is then full width. The old `flex-wrap` and the
`.nv-count-name { display: none }` override are gone with the flex row. Arrows
keep their 54px box, ivory chip, maroon edge, hover fill and disabled treatment
untouched. At the narrowest step the group has room to spare: 320 → counter 47.3
+ 18 gap + arrows 118 = 183.3 inside 280.

**No whitespace was added — the section got shorter at every width.** The
control row is still a single 54px line; `margin-top` came in from
`clamp(30px, 4vw, 46px)` to `clamp(24px, 2.8vw, 34px)` to match the shorter
group, which is the only height that moved:

| Viewport | Section (was) | Gap below image | Group right = image right |
|---|---|---|---|
| 320×720 | 1173.1 (1179) | 24 | 300 |
| 375×812 | 1105 (1111) | 24 | 355.2 |
| 576×800 | 1172.4 (1178) | 24 | 556 |
| 768×900 | 1260.3 (1266) | 24 | 732.3 |
| 992×800 | 777.4 (789) | 27.8 | 496.6 |
| 1200×800 | 847.8 (860) | 33.6 | 601.8 |
| 1440×900 | **972.9** (985) | 34 | 723 |
| 1600×900 | 1011.1 | 34 | 802.4 |
| 1920×1000 | 1025 (1037) | 34 | 962 |

**The counter tracks the slide.** Clicked through 01→05 and back to 01: the
number, the visible slide's `h3` and both disabled states all follow, and the
ends clamp (a sixth *next* at 05 and a sixth *prev* at 01 change nothing).
Keyboard `ArrowRight`/`ArrowLeft` on `.nv-slider` do the same. It gained
`aria-live="polite"` — the slides themselves are `aria-hidden`, so the counter is
the only thing left to announce position. Contrast on the `#F4E6C8` band:
**4.65:1**, clearing the 4.5 body floor at 12px.

**Verified:** `tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{`
still at byte 1086 ahead of `@layer theme{` at 236627. Zero real horizontal
overflow at all eight widths — the only `rect.width > innerWidth` hits remain
the three documented `.hero-media` scale(1.1) layers. The section's reveal set is
byte-identical (`fade@0, line@0, fade@0.1, fade@0.14`). A fresh in-page
`error` / `unhandledrejection` / `console.error` capture over a full
forward-and-back arrow run, the keyboard path and every nav link's star
returned **zero errors**.

> **Not verified:** no screenshot — the pane refused to composite all session
> ("Screenshot timed out after 5s"), so every geometry number is
> `getBoundingClientRect()` / `getComputedStyle` and every contrast number is
> computed. Two consequences worth naming. First, the hover *transition* was
> measured with `transition: none` injected (§Gotchas) — the end states are
> real, the 0.35/0.45s easing is not observed. Second,
> `getComputedStyle(link, '::after')` reports the nav underline as `scaleX(0)`
> even on a genuinely hovered link (`el.matches(':hover')` is true and the star,
> a real element, flips correctly) — a pseudo-element read artifact, not a
> regression: that rule was not touched. The drag-then-click guard was likewise
> not re-exercised; `.nv-viewport`'s handlers are untouched.

---

## Banner, sticky CTA & Neivedhyam (2026-08-12)

Three-point brief, **homepage only**. **Files changed:** `HeroSection.tsx`,
`StickyCTA.tsx`, `NeivedhyamSection.tsx`, `App.tsx` (one prop), `index.css`.
No inner page, no new file, no asset rebuilt. `KnowledgePage.tsx` and the
Festival Customs dishes block were deliberately **not** opened.

**1 · Hero scroll cue removed.** The `d-xl-flex` button at the banner's bottom
right — "Scroll" over a 54px gradient hairline, `onClick → scrollToSection
('brand-story')` — is gone, along with its one CSS rule
(`.hero-on-dark .hero-cue-label`). It was the component's only consumer of
`scrollToSection`, so the prop and its `HeroSectionProps` interface went with
it and `App.tsx` now renders `<HeroSection />`. Nothing else in the banner
moved: the plate, the wash, `.shell-hero`, the fixed 720px frame, the 3-slide
rotator, the markers and the whole GSAP intro timeline are byte-identical.
Verified at 1440: zero `.position-absolute` buttons left in `#hero`, no
"Scroll" string in its text, and the timeline's selectors all still resolve
(2 `.hero-line span`, 1 `.hero-sub`, 1 `.hero-meta` — the cue *was* the second
`.hero-meta`, and the tween's intent was always the markers).

**2 · The `10` is gone from the sticky tab.** Both places: the
`quiz-fab-badge` element at the foot of the tab and the `— 10 questions`
suffix on the button's `aria-label`, which now reads "Test your devotional
knowledge". The `count` prop is removed rather than defaulted, so nothing can
reintroduce the number silently (`App.tsx` never passed it). The
`.quiz-fab-badge` rule is deleted from `index.css`. Everything else holds: the
tab is still 46/40px, still `writing-mode: vertical-rl`, the greeting bubble
still teases once per session, the idle ring is untouched, and the label still
hides ≤575.98px — the phone step now shows the flame alone, which is what the
comment there says. Verified: **no digit anywhere in the launcher's text**,
zero `.quiz-fab-badge` nodes, and `quiz-fab-badge` absent from the built CSS.

**3 · Neivedhyam: five offerings, five correct photographs, arrows on the
right rail.**

*Five slides.* Thiruvannamalai Pongal, Nei Payasam, Kozhukattai, Sundal,
Panakam — the first five of the nine, kept because between them they cover the
rice offering, the sweet, the dumpling, the savoury and the sacred drink. Arisi
Upma, Murukku, Adhirasam and Besan Ladoo are removed (see Backlog). Copy,
`note`, `type` and `desc` on the survivors are untouched. The counter reads
`01 / 05`, there are 5 dots and 5 `.nv-slide`s, and the ends clamp correctly
(next disabled at 05, prev disabled at 01, verified by clicking through and
back).

*The images were the real problem.* **Eight of the nine URLs were not the dish
they were labelled** — audited as a contact sheet rather than trusted: payasam
was a paneer curry with naan, kozhukattai was idli, sundal was a sabzi in a
pan, murukku was chow mein, besan ladoo was pav bhaji, panakam was a brass lamp
with no drink in frame. Candidates were gathered from Unsplash's own search
endpoint, tiled into a labelled PNG with Pillow and read directly (the Browser
pane would not composite — see `CLAUDE.md` §7.9). The five shipped:

| Slide | `photo-` id | What it shows |
|---|---|---|
| Thiruvannamalai Pongal | `1732603891196-2b8cc24f39a5` | the pot boiling over on a kolam — literally the moment the copy describes |
| Nei Payasam | `1708782340713-02d0c39ea404` | kheer in a terracotta footed bowl, pistachio-topped |
| Kozhukattai | `1631743527335-f15e4a4fa196` | a tray of hand-shaped steamed dumplings |
| Sundal | `1697155836261-f7afd5353e64` | tempered chickpeas with onion and coriander |
| Panakam | `1777613112969-d7511ddfbe15` | a pale jaggery drink in glass, marigolds and kumkum beside it |

All five are warm-toned close crops served through the same
`?w=…&h=…&fit=crop` pipeline, so they share quality, 4:3 ratio and composition
as the track moves. `srcSet` / `sizes` / `loading` / intrinsic dimensions are
unchanged; the lazy-load comment now says "the other four".

*Arrows moved and made visible.* Source order in `.nv-controls` is now **dots →
counter → arrows** (it was arrows → dots → counter), so the pair closes the row
on the right. Measured: the arrows' right edge equals the container's **content**
rail *and* the slide CTA's right edge at 320 / 375 / 576 / 768 / 992 / 1200 /
1440 / 1920 — 300, 355, 556, 732, 948, 1149, 1381, 1635 — i.e. the CTA sits
directly above them on the same rail. They never overlap the dishes: the row
starts 30–46px below `.nv-viewport`'s bottom at every step.

Visibility was a contrast problem, not a size one. The chip was transparent
with a 22%-black hairline that measures **1.61:1** against the section's
`#F4E6C8` band — under the 3:1 floor a control's boundary needs. It is now an
ivory `#FFFDF7` chip with a `rgba(143,29,37,0.7)` edge: **border 3.60:1 on the
band**, 4.37:1 on the chip, glyph 8.71:1, stroke 1.2→1.7. 0.7 is the lowest
alpha that clears 3:1 with headroom (0.65 is 3.18). Size (54px), the maroon
hover fill and the disabled treatment are unchanged bar opacity 0.28→0.4.

*No height was added.* The ≤991.98px `.nv-dots { order: 3; width: 100% }`
override — which existed only to lift the dots out from between the left-hand
arrows and the counter — is deleted, because the new source order already reads
correctly. The controls stay **one 54px row at every width**; on the narrowest
steps the dots wrap inside their own flex box (13px tall, still inside the row).
Section heights: 320 → 1179, 375 → 1111, 576 → 1178, 768 → 1266, 992 → 789,
1200 → 860, **1440 → 985** (identical to the previous session's measurement),
1920 → 1037.

**Verified:** `tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{`
still at byte 1086 ahead of `@layer theme{` at 236624, and both deleted rules
(`hero-cue-label`, `quiz-fab-badge`) are absent from the built CSS. Zero real
horizontal overflow at all eight widths — the only `rect.width > innerWidth`
hits remain the three documented `.hero-media` scale(1.1) layers. A fresh
in-page `error` / `unhandledrejection` / `console.error` capture over the
slider's full forward-and-back run returned **zero errors**. The section's
reveal set is byte-identical (`fade@0, line@0, fade@0.1, fade@0.14`) and the
slider's own fade was hand-driven to confirm it (opacity 0 → `progress(1)` → 1),
since `data-anim-ready` is absent on all 38 elements — the documented false pass.

> **Not verified:** no screenshot of the finished section. The pane composited
> twice early in the session and then refused for the rest ("Screenshot timed
> out after 5s"), so every geometry number above is `getBoundingClientRect()` /
> `getComputedStyle` and every contrast number is computed. The **imagery** was
> genuinely looked at, via the Pillow contact sheet. The drag-then-click guard
> was not re-exercised — its code is untouched.

---

## Nav, Our Story sizing & footer (2026-08-11)

Five-point brief, **homepage only**. **Files changed:** `Navbar.tsx`,
`LampLightingSection.tsx`, `Footer.tsx`, `index.css`. No inner page, no other
section, no new file, no asset rebuilt.

**1 · Products dropdown is back**, with exactly two items: *Lamp Oil* and
*Agarbathi*. Same 264px panel, same hover open, same maroon/gold item hover as
Festivals & Traditions — it reuses the existing `dropdown` array on `navLinks`,
so the caret, the desktop panel and the mobile `— Label` sub-list all came for
free. **Both items resolve to `#products`**, because the section has no
per-product anchors (only `id="products"` on the section itself); that is a
deliberate two-labels-one-destination menu, which is the pattern this file's own
comment previously argued *against* when it collapsed the dropdown. The comment
is updated to say so rather than left contradicting the code. Verified: panel
lists `['Lamp Oil','Agarbathi']`, a click closes the menu, stays on `home`, and
the scroll target geometry is exact (the animated scroll itself is unobservable
here). Mobile sheet at 375×812 lists all five entries plus both sub-lists with
**zero overshoot** (738 content in a 738 sheet).

**2 · Our Story plate capped, section held to one fold.** New
`--story-plate-max: 520px` on `.story`, applied as `max-width` +
`margin-inline-start: auto` on `.story-plate`. The frame goes **649×695 → 520×557
at 1440** with `aspect-ratio: 14 / 15` untouched, so the 1400×1500 asset still
decodes at zero crop — the cap shrinks it, nothing distorts it. The auto margin
pulls the narrower frame onto the container's **content** rail (plate right edge
1381 = content right edge at 1440; 1481 at 1600; 1635 at 1920), so the width it
gives back falls in the middle gutter instead of orphaning the plate mid-column.
Inert in the 992–1199.98 band, where the column is already narrower than the cap.

The height came out of four places, all in the OUR STORY block:
`.story { padding-block: clamp(44px, 3.8vw, 68px) }` (was `.section`'s 64–104),
eyebrow margin 26→20, headline 24→22, divider 30→24, quote card margin-top 32→26.
**The copy column, not the plate, drives the row** (568px at 1440), which is why
the padding had to move — capping the plate alone would have changed nothing
above 992. See `CLAUDE.md` §4 for the source-order requirement on that override
and why the fold budget is the *scrolled* nav.

Stacked (≤991.98px) the plate keeps its documented 4:3 flatten and
`object-position: center bottom` — that crop is tuned to keep the lamp whole and
the brief's "don't crop important elements" argues for leaving it. It only gains
`max-width: min(520px, 100%); margin-inline: auto`, so it centres and stops
running the full container width. **Mobile got shorter, not taller** (see table).

**3 · Lamp Lighting Guide CTA is static.** Dropped the `magnetic` prop only. The
`data-anim="fade" data-delay="0.18"` wrapper, the `variant="solid"`, the label,
the `setPage('lamp-lighting')` handler and the `.cta` hover transitions
(colour/background/border/transform, 0.45s) are all untouched. Verified: no
`.magnetic` ancestor, `transform: none` at rest, **zero `.magnetic` nodes on the
page**, box still exactly 52px (`--cta-h`), and a click still lands on the guide
page (`h1` reads "The Sacred Art of Lamp Lighting").

**4 · Footer bottom gap halved.** The inner block was `paddingBlock: clamp(44px,
4.4vw, 68px)`, so the bottom rail carried the same 44–68px *on top of* the legal
row's own 22px `paddingTop` — a ~90px void under the copyright line. Split into
`paddingTop: clamp(44px, 4.4vw, 68px)` + `paddingBottom: clamp(22px, 2.2vw,
30px)`, which matches the row's internal rhythm. Measured gap below the row:
**63.4 → 30px** at 1440/1600/1920, 26 at 1200, 22 at ≤992. The top padding and
the row's own 22px are unchanged, so the footer stays balanced rather than just
shorter.

**5 · Footer logo 54 → 64px** tall, `width: auto` kept (204:200 → renders
65.3px wide, no distortion), `marginBottom: 24` unchanged so the brand column's
alignment holds.

**Note on scope for 4 and 5:** `Footer.tsx` renders under all five routes, so
those two changes reach the inner pages by construction — the same situation as
`.closing` (§Gotchas). There is no page-aware hook for the footer and the brief
asked for the footer itself, so this is intended, not leakage. Points 1–3 are
genuinely homepage-only (`Navbar.tsx` is shared but the change is a menu entry,
and `.story-*` / `#lamp-lighting` exist only on the homepage).

**Measured** — Our Story section height, plate and copy, plus the footer gap:

| Viewport | Section (was) | Plate (was) | Copy | Ratio | Footer gap |
|---|---|---|---|---|---|
| 320×720 | 1103 (1250) | 280×210 (280×210) | 280×761 | 4:3 | 22 |
| 375×812 | 1087 (1234) | 335×251 (335×251) | 335×703 | 4:3 | 22 |
| 576×800 | 1090 (1223) | 520×390 (536×402) | 536×568 | 4:3 | 22 |
| 768×900 | 1064 (1325) | 520×390 (706×530) | 706×542 | 4:3 | 22 |
| 992×800 | 690 (811) | 445×477 (446×477) | 445×593 | 14:15 | 22 |
| 1200×800 | 684 (821) | 520×557 (540×579) | 540×588 | 14:15 | 26 |
| 1366×768 | 672 | 520×557 | 620×568 | 14:15 | 30 |
| 1440×900 | **678** (868) | 520×557 (649×695) | 620×568 | 14:15 | 30 |
| 1600×900 | 696 (906) | 520×557 (666×714) | 620×568 | 14:15 | 30 |
| 1920×1000 | 704 (915) | 520×557 (660×707) | 620×568 | 14:15 | 30 |

**Single-fold check** uses the scrolled bar (94px — `--nav-h-scrolled` plus the
border and progress hairlines), which is the only state Our Story is ever seen
in: 690+94=784 ≤ 800 at 992, 684+94=778 ≤ 800 at 1200, **672+94=766 ≤ 768 at
1366**, 678+94=772 ≤ 900 at 1440, 704+94=798 ≤ 1000 at 1920. 1366×768 is the
binding case and set the 3.8vw coefficient. Page height 6663 → 6450 at 1440.

Zero real horizontal overflow at 320 / 375 / 576 / 768 / 992 / 1200 / 1366 /
1440 / 1600 / 1920 — the only three `rect.width > innerWidth` hits at every step
are the documented `.hero-media` scale(1.1) layers. Our Story's reveal set is
byte-identical (`fade@0, line@0, fade@0.1, fade@0.16, fade@0.2, mask@0`), and
the plate's `mask` reveal was hand-driven to confirm the cap didn't break it:
`inset(0 0 100%)` hides, `progress(1)` clears to `inset(0 0 0%)`. No colours
moved, so no contrast recompute was needed. `tsc --noEmit` clean, `npm run build`
passes, `@layer bootstrap{` still at byte 1086 ahead of `@layer theme{` at 236624.

> **Not verified:** no screenshot — the Browser pane is not displayed, so it
> refuses to composite (`Screenshot timed out after 5s`). Every number above is
> DOM measurement or `getComputedStyle`. The dropdown's *animated* scroll to
> `#products` is likewise unobservable (§Gotchas); the geometry was proved with
> `behavior: 'auto'`. Also new: the pane's console buffer is stale and replays
> errors for components deleted sessions ago even after a server restart — a
> fresh in-page error capture over all five changed surfaces returned **zero
> errors**. See `CLAUDE.md` §7.7.

---

## Homepage strict update (2026-08-11)

Nine-point brief, **homepage only**. Inner pages verified untouched by
measurement (their CTAs still report the old 34.4/60.4px padding-driven heights,
their `.line-mask`es have no padding, no eyebrow carries a star).

**Files changed:** `App.tsx`, `BrandStory.tsx`, `ProductsShowcase.tsx`,
`LampLightingSection.tsx`, `FestivalsSection.tsx`, `NeivedhyamSection.tsx`,
`FAQSection.tsx`, `Footer.tsx`, `index.css`; **new:** `EyebrowStar.tsx`.

**A homepage scope now exists.** `App.tsx` wraps the home fragment in
`<div className="home-page">`, and every rule in the new HOME PAGE block in
`index.css` is scoped to it, so nothing reaches the inner pages. Two rules also
name `.closing`, because Footer.tsx renders that section under *every* page and
there is no page-aware hook for it — see §Gotchas.

**1 · Headline clipping.** `.line-mask` is `overflow: hidden` and its height is
the line box, but the heading line-heights (H1 1.05, H2 1.15) are **tighter than
Fraunces' own ascent + descent, 1.234em**. Measured at 1440: the hero H1 line box
is 67.2px against a 79px font box, so the mask was cutting **5.9px off every
descender** — the y in "Let Every Breath", "Purity", "Daily Devotion"; H2 lost
1.9px the same way. Fix is `padding-bottom: 0.16em` + `margin-bottom: -0.16em` on
the mask: the padding gives the descender room, the negative margin gives the
height straight back. Section heights confirm it cost nothing — hero 720,
lamp-lighting 841.6 (was 842), FAQ 558.3 (was 558), closing 480.4 (was 480).
0.12em was tried first and left the 44px mobile H1 only 0.9px of clearance;
0.16em gives 2.9px there and 3.9px at desktop. **Every one of the 16 masks now
measures positive headroom at 320 / 375 / 576 / 768 / 992 / 1200 / 1440 / 1920.**

**2 · Eyebrow star.** Our Story's inline four-petal kolam star became
`EyebrowStar.tsx` and now sits in all six homepage eyebrows (Our Story, Products,
Lamp Lighting, Festivals, Neivedhyam, FAQ). It draws in `currentColor`, so it
takes each eyebrow's maroon rather than pinning a hex. `.story-copy .eyebrow svg`
was replaced by `.eyebrow-star`, which carries the same `flex-shrink` and −4px
pull. Inner-page eyebrows deliberately do **not** get it.

**3 · Products description.** "Pure, trusted, and crafted for every ritual…"
moved **back** out of Our Story's prose into the Products header, on the right —
the line was authored for this header and had been parked in Our Story. The
header is now two halves on **the tiles' own rails**: title 1–6, description
7–12, bottom-aligned. Measured at 1440 the description's left edge is x732 and
the right-hand tile's is x732; at 1200 both are 610, at 992 both 503, at 1920
both 975 — literally aligned with the objects. Our Story lost that one paragraph
and nothing else: its remaining reveals are `fade@0, line@0, fade@0.1,
fade@0.16, fade@0.2, mask@0`, the values they always had, and the section still
measures 868px at 1440 because the plate, not the copy, drives that row.

**4 · CTA band.** New `--cta-h: 52px` token. `.home-page .cta` / `.closing .cta`
take `min-height: var(--cta-h)` and `padding-block: 0`, so all **14** homepage
buttons measure exactly 52px at every breakpoint — they were 55 (solid/gold), 53
(outline) and 29 (line). 14px and full caps needed no change: `.cta` already sets
`--fs-body-sm` and `text-transform: uppercase` (verified: every label renders
identical to its own uppercase). `min-height` rather than `height` is deliberate —
below sm the long labels wrap, and a hard height would clip the second line
("EXPLORE THE LAMP LIGHTING GUIDE" is two lines in 52px at 375px).
`.cta-line`'s drawn-in underline is re-pinned to the label rather than the box
(`bottom: calc(50% - 0.8em - 6px)`), which puts it 12.1px under the baseline —
the same distance as before the box grew.

**5 · Explore Festival Customs** moved out from under the three cards into the
header's right column, directly beneath its intro (18–28px gap). **The row had to
switch from `alignItems: 'end'` to `'start'`:** with a button in it the right
column is the taller of the two through the 992–1199 band, and bottom-aligned it
started 34px *above* the eyebrow. Section 939 → 864 at 1440.

**6 · Neivedhyam Dishes & Recipes** moved into the slide copy, at the end of the
offering's description block (past the note's hairline, `.nv-cta`). One per
slide, but only one slide is ever in view; inactive copies get `tabIndex={-1}`
because their container is `aria-hidden`. Section 1058 → 985.
**This introduced a drag hazard and it is guarded:** the track's pointer handlers
live on `.nv-viewport`, so a drag *starting* on the new link would advance the
slide and then fire the link's click on release. `suppressClick` is set on
pointerup when the pointer travelled >6px, cleared on the next pointerdown, and
read by an `onClickCapture` on the viewport. Verified both ways — a drag-then-click
is `defaultPrevented` and stays on the homepage; a clean click still lands on the
Festival Customs page with `#neivedhyam-dishes` present.

**7 · The closing "underline" is gone.** The second `.closing-divider` — the gold
hairline with a centre diamond that sat *below* the Shop on Kaleesuwari button —
is removed. The one above the lead stays: it separates headline from copy. The
section still measures 480px at 1440, because the media column drives that height.

**8 · New inter-section rule.** `.rule-kolam .rule-temple` in `App.tsx`, between
Lamp Lighting and Festivals: tapering gold hairlines out of a centred motif —
the eyebrow's four-petal star at 1.38×, flanked by two diamonds and four pulli
dots. 620px capped (86% on phones), 18px tall, `--ink-gold` (ornament only, no
text), centred to within 0.2px at every width, and **static by design** — no
`data-anim`, the same decision as Our Story's `.story-divider`. It sits in the
seam the two sections' own padding already makes, so it costs the page 18px.

**Measured** (1440 unless noted). Section heights: hero 720, story 868, products
923 (was 905 — the header's right column plus the taller tile CTAs), lamp-lighting
842, festivals 864, neivedhyam 985, faq 558, closing 480. Page 6663. Zero real
horizontal overflow at 320 / 375 / 576 / 768 / 992 / 1200 / 1440 / 1920 (DOM
walk; the only `rect.width > innerWidth` hits are the three `.hero-media` layers,
which is the documented scale(1.1) intro tween). `@layer bootstrap{` still at
byte 1086 ahead of `@layer theme{` at 236624.

**Reveals verified by hand, not by opacity reads.** The pane would not composite
this session, so `useReveal`'s rAF scan never ran (`data-anim-ready` absent on
all 33 elements — the false pass described in §Gotchas). Driving the hook's own
`gsap.set(inner, {yPercent: 108})` shows the hidden state still hides completely
inside the padded mask: a 3.34px strip of the inner box falls in the padding
band, but its ink starts 2.76px *below* the clip edge, so no ink is ever exposed.
`progress(1)` clears it and the descender then sits 1.77px inside the mask.

> **Not verified:** no screenshot — the Browser pane is not displayed, so it does
> not composite frames. Every number above is DOM measurement or
> `getComputedStyle`. The animated deep-link scroll from the slide CTA is also
> unobservable here (§Gotchas); the destination and anchor were confirmed.

---

## Our Story redesign (2026-08-11)

Homepage "Our Story" only, against a supplied reference image. **Three files:**
`BrandStory.tsx` (rewritten), `index.css` (the old four-line `.story-plate` rule
replaced by an OUR STORY block), **new** `tools/build-story-plate.py` and its two
assets. No other section, page or component was touched.

**Layout** — two halves rather than 6/5 + a spacer column: copy `1 / span 6`
capped at a 620px measure, plate `7 / span 6`. The eyebrow moved *into* the copy
column (it had been on its own rail above the grid), which is what puts the
plate's top edge level with it, as the reference does. At 1440: copy 620×657 at
x49, plate 649×695 at x732 — against the reference's 615 / 720 on 1409px rails.

**Type + colour** — headline is two lines in two colours: `Born of Flame,` in
maroon (`.t-maroon`), `Built on Faith` in italic display gold. Both still come
from `SplitLines`, so the per-line reveal is unchanged. The gold is a **new
token**, `--story-gold-display: #A97F1B` — see `CLAUDE.md` §4 for why it is not
`--ink-gold`. Surface is `--story-surface: #FBF4E9`, the one cream band on a page
of ivory sections.

**Divider** — the site's existing `.rule-kolam` plus a `.story-divider` cap:
`min(480px, 78%)`, which is the reference's 477-of-615 proportion and holds it
when the column narrows (a flat 480px went full-width at the middle steps).

**Quote card** — the same `<blockquote>`, restyled: 18px radius, cream gradient,
a 1px gold inset edge, a 3px gold rule down the left, a gold `“` glyph in the
first grid column and `.pattern-petal` masked in from the right at 0.13. The
quote text is capped at `min(380px, 100%)`, the width at which it breaks after
"faith" as the reference does. Below 575.98px the glyph moves *above* the quote —
beside it, in a 280px card, it was taking a third of the measure and pushing the
quote to four lines.

**Ornament stays one element.** The section's spinning `.mandala-faint` is the
same node with the same classes, repositioned to crop into the top-right corner
(`right: -168px; top: -172px`, 560px). The section gained `overflow-hidden` to do
the cropping — without it the negative `top` would have laid gold hairlines over
the bottom of the hero. No second ornament was added; the reference's floral
corner is served by the mandala and the card's petals.

**The plate is now local, and tool-built.** *(Superseded 2026-08-12: the section
ships the supplied `Images/Our Story.png` as `imports/our-story.webp` instead, and
`story-dheepam.webp` is deleted. `tools/build-story-plate.py` and
`Images/story-dheepam-source.jpg` are kept because the headroom-growing technique
below is the pattern for any future plate that needs reframing — but running the
tool no longer produces an asset the site imports. See §Imagery, nav CTA, slider
group & footer.)* `tools/build-story-plate.py` takes
`Images/story-dheepam-source.jpg` (the same brass-dheepam photograph the section
already used, pulled down from Unsplash at 2800px) and produced
`src/imports/story-dheepam.webp`, 1400×1500, 73.6KB:
- a 14:15 window cut from the source's own height is only 1742px wide and the
  lamp bowl alone measures 1680 of it, so **430px of bokeh headroom is grown
  first** — the top band mirrored, stretched and blurred, exactly the hero
  plate's construction — and the wider window taken from that. The bowl ends up
  at ~78% of the frame width, the reference's proportion.
- warm per-channel curve (R γ0.88×1.03, B γ1.30×0.86), saturation 1.22, contrast
  1.14; a radial fall-off to `#201006` normalised at 1.15 so the **mid-edges**
  darken too, not just the corners (the pale studio wall reads either side of the
  bowl otherwise, and it is what hides the wicker basket at the far left); a warm
  bloom screened back off the photo's own highlights.
- `.img-warm` was dropped from the frame — the plate is graded warm in the asset
  now, and the maroon wash on top only muddied it.

**Two content decisions worth knowing:**
- The image caption ("The dawn lamp · A ritual unchanged for centuries") is
  **gone** — the reference has a clean frame with nothing under it. Its
  `fade @0.12` reveal went with it.
- The products header's supporting line ("Pure, trusted, and crafted for every
  ritual…") **stayed**, at the head of the prose with its `fade @0.08` intact.
  It was deliberately moved into Our Story in the previous session and exists
  nowhere else on the site, so dropping it — the reference shows two paragraphs,
  not three — would have deleted site copy. It costs ~70px of copy height, which
  is what the middle-band centring below is absorbing.

**Reveal choreography is byte-identical** on every surviving element: eyebrow
`fade@0`, headline `line@0` (2 `.line-inner`), prose `fade@0.08 / 0.1 / 0.16`,
quote card `fade@0.2`, plate `mask@0`. Nothing was added — the new divider
deliberately carries **no** `data-anim`. Verified by driving the hook's own
`gsap.set`/`gsap.to` pairs by hand (see `CLAUDE.md` §7.6 — the pane's usual
"opacity 1" read is a false pass here).

**Measured** (`--space-section` rhythm; section height at 1440 fell 999 → 868):

| Viewport | Section | Copy | Plate | Quote lines |
|---|---|---|---|---|
| 320×720 | 1250 | 280×871 | 280×210 | 3 |
| 375×812 | 1234 | 335×818 | 335×251 | 2 |
| 576×800 | 1223 | 536×657 | 536×402 | 2 |
| 768×900 | 1325 | 706×606 | 706×530 | 2 |
| 992×800 | 811 | 446×683 | 446×477 | 2 |
| 1200×800 | 821 | 540×677 | 540×579 | 2 |
| 1440×900 | **868** | 620×657 | 649×695 | 2 |
| 1600×900 | 906 | 620×657 | 666×714 | 2 |
| 1920×1000 | 915 | 620×657 | 660×707 | 2 |

Zero horizontal overflow at every step (DOM walk, not `scrollWidth`), the plate
decodes at 1400×1500, and the quote glyph stays inside the card everywhere.
Contrast computed on the cream: display gold **3.35:1 at 48px** (large-text floor
3.0), maroon headline 8.11, body 11.56, eyebrow 8.11, and the attribution
5.39:1 against the card's own gradient.

> **Not verified:** no screenshot. The Browser pane would not composite this
> session, so every read above is DOM measurement and `getComputedStyle`. The
> plate itself was eyeballed as `tools/story-plate-preview.png`.

**The 992–1199.98 band centres the plate** (`.story-media { align-self: center }`)
instead of top-aligning it. In a 446px column a 14:15 plate is 477px against 683
of copy, and top-aligned that left ~200px of empty column beside the quote card —
the void this layout exists to close. It cannot be fixed by making the frame
taller: the lamp sits slightly left of centre with only ~5% margin, so any ratio
above 14:15 has `cover` take the difference off the sides and clip the rim.

---

## Homepage update (2026-08-11)

Seven-point brief, homepage only. Inner pages were touched in exactly one place:
a `neivedhyam-dishes` anchor on `FestivalCustomsPage`, needed to land the new
CTA. Everything else is homepage components plus `index.css`.

**Files changed:** `App.tsx`, `HeroSection.tsx`, `BrandStory.tsx`,
`ProductsShowcase.tsx`, `Navbar.tsx`, `NeivedhyamSection.tsx`, `FAQSection.tsx`,
`StickyCTA.tsx`, `Footer.tsx`, `FestivalCustomsPage.tsx` (one anchor), `index.css`;
**new:** `FestivalsSection.tsx`.

**1 · Hero.** `.hero-shell` is now a **fixed height**, not a viewport fraction:
720 desktop / 660 ≤1199.98 / 640 ≤991.98 / 600 ≤575.98. The plate is `cover`, so
a fixed frame only changes how much invented sky is trimmed off the top — the
products are untouched at every step, and there is 166–278px of banner clear
below the copy on tablet and phone. The banner also gets **its own container**:
`--container-hero: 1520px` via `.shell-hero`, applied after `.shell-wide` so it
wins on source order. At 1920 the banner rails measure 195→1715 against the
editorial 215→1695, which is the "content slightly aligned with the banner
container" the brief asked for; below ~1620 both containers are viewport-bound
and identical. The description dropped `.lead` (20px) for `.body` (16px) — a new
`.hero-on-dark .body` rule carries the on-dark colour at 0.90 alpha (the lead
was 0.88, so contrast is no worse than the 6.2:1 measured in §Hero plate). The
*Explore Products* CTA is gone, along with its GSAP tween and the ≤991.98px
re-ordering block that existed only to lift the markers above it.

**2 · Brand Story.** The products header's supporting line ("Pure, trusted…")
moved here, into the right column, level with the H2. The eyebrow was lifted
**out of the grid** onto its own rail to make that exact alignment fall out of
the layout rather than a magic offset — measured `h2.top === desc.top` (857px at
1440). The *Learn More About Dheepam* CTA is gone. With the CTA and the header
row both out of the copy column, the pull-quote had to come back from the image
column: leaving it opposite left **310px of dead space** beside the plate.
Section dropped `section-major` → `section`. Net: 1201px → 999px at 1440.

**3 · Nav.** Products and Lamp Lighting lost their dropdowns — every child
resolved to the same destination as the parent, so the menu was four ways of
clicking one link. Both are now direct: Products scrolls `#products`, Lamp
Lighting opens the page. *(Superseded for Products: a later brief the same day
put a two-item dropdown back on it — see §Nav, Our Story sizing & footer.)*
`Neivedhyam` was renamed **Festivals & Traditions**,
points at the new `#festivals` section, and carries the one remaining dropdown:
*Festival Customs* and *Neivedhyam Dishes & Recipes*. Dropdown items gained an
optional `anchor` so the second can deep-link `#neivedhyam-dishes` after the
page mounts (260ms, because `setPage` scrolls to top first). `data-active` now
covers the lamp-lighting and festival-customs pages too.

**4 · Festivals & Traditions.** New `FestivalsSection.tsx` — the section removed
in an earlier session, rebuilt to the brief. Header (title left, intro right,
same shape as Neivedhyam below it), three cards, one CTA to `festival-customs`.
The Diwali card reuses the Festival Customs page's own Diwali plate.

**5 · Neivedhyam.** Eyebrow renamed to "Neivedhyam Dishes & Recipes". The
per-slide *Explore the Ritual* CTA is gone — nine slides meant nine buttons to
one destination — replaced by a single CTA below the controls.

**6 · FAQ.** Title only: "Your Questions, Answered" → "Frequently Asked
Questions". Layout untouched.

**7 · Sticky CTA.** The bottom-right chat-widget circle became a **vertical tab
on the right edge**, centred on the viewport: `right: 0; top: 50%`, the wrap in
`row` direction so the greeting bubble opens to its left, and the label set with
`writing-mode: vertical-rl` + `rotate(180deg)` so it reads bottom-to-top. The
unread badge moved into the flow at the foot of the tab — a 46px column has no
corner to hang one off. The idle ring scales on **x only** so it pulses off the
edge instead of escaping the viewport. z-index 40 keeps it under the nav (50).

**Compaction found on the way:** the Brand Story plate's `aspect-ratio` moved
from an inline `4 / 5` to `.story-plate` in CSS, so the folded breakpoints can
flatten it (4:3 ≤991.98, 3:2 ≤575.98) — full-width 4:5 measured **1075px tall**
on a 900px tablet, the single biggest block of dead height on the page
(section 1757 → 1342). The festival cards likewise turn on their side below
767.98px — stacked as full-width tiles the section ran **1920px at 576**; as
row cards it is 1100.

**Measured** (1440 unless noted). Page height 7508 → 7306 desktop. Section
heights: hero 720, story 999, products 905, lamp-lighting 842, festivals 939,
neivedhyam 1058, faq 558. Verified at 320 / 375 / 576 / 768 / 900 / 1100 / 1200
/ 1440 / 1920: zero real horizontal overflow (the only `rect.width > innerWidth`
hits are the three `.hero-media` layers, which is the scale(1.1) intro tween —
see §Gotchas), all `[data-anim]` settle to opacity 1, mobile sheet lists all
seven entries and fits without scrolling, no console errors. Contrast computed:
card period 5.70:1, card body 12.42:1, tab label 10.11:1.

> The deep-link scroll could not be observed in the Browser pane —
> `behavior: 'smooth'` needs rAF, which is frozen when the pane isn't
> compositing (`scrollTo` with `behavior: 'auto'` lands exactly on target, so
> the geometry is right). Re-check it in a real browser.

---

## Layout adoption + Bootstrap (2026-08-11)

Homepage adopted against `Dheepam website home.png` (1920×9176, authored at a
~1440 viewport — its rails measure within 5px of the existing 1480 container, so
the container did **not** change). Scope was layout only: typography, the
products header, hero framing and the closing CTA were explicitly held.

The comp predates the current build in three places, and those were **not**
adopted: DM Serif Display headings, the products right-hand column, the hero
bottom fade. The comp's homepage quiz section was likewise not restored — it
lives on the `knowledge` page by decision.

**Bootstrap 5.3.8** is now the responsive layer, imported in `index.css` as:

```css
@layer bootstrap, theme, base, components, utilities;
@import 'bootstrap/dist/css/bootstrap.min.css' layer(bootstrap);
@import 'tailwindcss';
```

The `layer()` is load-bearing — see `CLAUDE.md` §9. Verified in the built CSS:
`@layer bootstrap{` lands at byte 699, ahead of `theme` (236237), `base`,
`components` and `utilities`, so Bootstrap loses every tie and the unlayered
design system outranks both. Cost: bundle CSS 271KB raw / 40KB gzip.

**Breakpoints moved onto Bootstrap's** (575.98 / 991.98 / 1199.98) from the old
Tailwind-ish 640 / 900 / 1024, so type and layout now break at the same widths.
Type *sizes* are untouched — only the widths they switch at moved. The tablet
step starts at 1199.98 rather than 992 because the 992–1199 band cannot carry a
64px H1 in a 7-of-12 hero column.

**Spacing ladder compacted ~35%** (`--space-sm/content/section/major` now
18–28 / 36–56 / 64–104 / 80–128; was 24–40 / 48–72 / 96–160 / 120–200). Ratios
between the four steps are unchanged. Page height at 1440 fell 8104 → 6475.

**Three structural changes:**
- **Products is no longer `.section-fold`.** `min-height: 100vh` + flex centring
  claimed a full viewport regardless of content and capped the section's own top
  padding at 90px — the open backlog question. Gone; the section is sized by its
  content. The 13/6 tile ratio was the part worth keeping and stayed.
- **Lamp Lighting rebuilt** from a centred manifesto + 440px full-bleed band to
  the comp's split editorial. Same rails as Brand Story (copy 49→698, plate
  846→1381 at 1440), so the two editorial rows rhyme.
- **Brand Story pull-quote moved** into the image column beneath the plate,
  where the comp puts it.

**Bugs found and fixed on the way:**
- `.grid12 > *` collapse carried `!important` *and* outranked `.col-2up`
  (0,1,1 vs 0,1,0), so product tiles went **1-up from 1024px down** — the
  opposite of their own rule. Now `:not([class*="col-"])`, so explicit column
  utilities keep control. This is why that section ran so tall on tablet.
- The mobile nav sheet was `calc(100vh - 76px)` against a bar that has been
  112/92 since it grew — it overshot the viewport by ~36px. Now
  `calc(100dvh - var(--nav-cur))`; measured overshoot 1px at 375×812.
- `.cta` had `white-space: nowrap` + 34px side padding, so "Explore the Lamp
  Lighting Guide" measured **399px inside a 335px column at 375px wide**;
  `overflow-x: clip` was hiding it, not fixing it. Below sm the label wraps and
  padding tightens — now 335px wide, 77px tall.
- The stacked product tile inherited the 5:4 plinth on phones, cropping the
  2.17:1 scene photo by ~42% of its width, straight through the bottles. The
  scene tile now keeps its native 13/6 there; the packshot gets 4:3.

**Nav height is tokenised** — `--nav-h` / `--nav-h-scrolled` on `:root`, with
`--nav-cur` published on the `<nav>` element. 112/92 desktop, 84/72 tablet,
74/64 phone. The bar, the logo (0.75×), the hero's top pad and the mobile sheet
all read it. The other pages' hard-coded offsets were left alone: they only
over-clear a shorter bar, they don't break.

**Core Web Vitals:** fonts moved out of the CSS `@import` (which serialised
index.css → fonts.css → font files) into `<link>` + preconnect in `index.html`;
preconnect added for `images.unsplash.com`; `srcset`/`sizes` on all three
remote-image sets; intrinsic `width`/`height` on every `<img>` to reserve space;
`decoding="async"` throughout; the eight off-screen slider images stay `lazy`.

**Verified** at 320 / 375 / 576 / 768 / 992 / 1200 / 1440 / 1600 / 1920: zero
horizontal overflow, no element wider than its viewport, all 36 `[data-anim]`
elements settle to opacity 1, no console errors. All six sections plus `.closing`
measure identical rails (110→1481 at 1600).

> Measuring note: the bar height and logo reads come back as the *pre-transition*
> values when the Browser pane is not compositing (`CLAUDE.md` §7.1). Inject
> `*{transition:none!important}` before measuring anything with a transition.

---

## Hero plate — how the banner asset is made

The campaign artwork is a **2.67:1 panorama**; the hero frame is ~1.66:1. Plain
`object-fit: cover` therefore discards ~40% of the width, and the products live
in exactly that band — so no `object-position` value can deliver both a clean
left column *and* intact packaging. The asset is pre-framed instead.

`tools/build-hero-plate.py` (Pillow) does it: scales the panorama **whole** to
2200px, takes the 300px surplus **off the left only** (empty gradient — the right
edge stays flush so nothing on the product side is lost), then extends the amber
ground 327px upward to reach 1900×1152 (**1.649:1**). The sky is the photo's own
top rows mirrored, stretched and blurred, so the seam is colour-exact, plus a
soft warm dim at the crown. Products are never cut, scaled independently or
retouched. Re-run it on any artwork swap; check `hero-plate-preview.png` first.

**Why 1.649:1** — any frame wider than that trims only the invented sky off the
top (hence `object-position: … bottom`), so a normal desktop shows the artwork
at **zero horizontal crop**: products land at 44.2%→97.3%, leaving the left 44%
open. The `92%` horizontal bias only bites on unusually tall windows, where it
sends the trim into the empty left gradient rather than the packaging.

Measured (1440×860): crop L/R/B = 0, top 7px. Copy clears the bottles by ~10
points — widest headline ink ends at 34%, lead at 32.3%, CTA at 18.9%.

| Breakpoint | `object-position` | What fits |
|---|---|---|
| desktop | `92% bottom` | everything; left 44% open |
| ≤991.98px | `90% bottom` | every SKU whole; lotus + brass lamp (props) fall outside |
| ≤575.98px | `62% bottom` | the three lamp-oil bottles complete |

---

## Closing CTA (2026-08-11)

"Ready to bring Dheepam home?" rebuilt to a supplied reference image. Scope was
**this section only** — `Footer.tsx`'s `.closing` block and the CLOSING SECTION
block in `index.css`. Nothing else in either file changed.

**Layout** — `.closing-grid`, `1fr / 0.62fr` with a `clamp(40px, 5.2vw, 96px)`
gap, centred. At 1440 that resolves to media 776 × copy 481, within ~15px of the
reference's proportions on the existing `.shell-wide` rails (re-measured at 1600
after the layout work: 795 / 493, ratio held). Collapses to one
column at ≤991.98px, where the bloom is also capped at 440px so it doesn't eat a
screen before the copy appears.

**Media** — `src/imports/closing-ritual.webp`, cut from `Images\Section 1.png`
(1086×1448 portrait → 7:6 band starting at y=270; keeps her face, the full
kuthuvilakku and both bottle labels). It is clipped by an inline SVG `clipPath`,
not a CSS mask, so one path constant (`BLOOM` in `Footer.tsx`) drives both the
clip and the gold outline and they cannot drift apart. The path is an ellipse of
radius `1 + 0.026·cos(12θ) + 0.008·cos(6θ)` sampled at 48 points through
Catmull-Rom. **Twelve lobes is a tuned value:** eight put sharp tips on the
ellipse's major axis, and an irregular wave read as a blob rather than a bloom.

**Copy column** — lotus glyph + rule → eyebrow → h2 (unchanged copy) → gold
divider with a centre diamond → lead → outlined-gold CTA → second divider. All
gaps step off `--closing-stack` / `--closing-stack-tight`.

**CTA** — `Button variant="outline"` plus a `.closing-cta` class; only the colour
treatment is section-scoped, every dimension still comes from `.cta`.

**Background linework** — a temple mandala (concentric rings, 16 lotus petals, 8
gopuram spires, ashtakona) cropped off the right edge at 15%, and a kolam
star-and-pulli lattice cropped into the bottom-left corner at 10%.

Every value the section uses is a `--closing-*` custom property declared on
`.closing` itself, so it retunes from one place without touching markup.
Contrast computed (not eyeballed) against the analytically-reconstructed
gradient: eyebrow 5.04:1, CTA 5.59:1, lead 7.34:1, headline 10.09:1 — all worst
case, i.e. with a mandala hairline directly behind the glyph.

## Closing CTA compaction (2026-08-11)

"Ready to bring Dheepam home?" only. **Two files, both edits confined to the
closing block:** `Footer.tsx` (the `.closing` `<section>`) and `index.css`
(the CLOSING SECTION block). The footer links below it, every other section and
every inner page are untouched.

**Removed** — the `LotusGlyph` component and its `.closing-glyph` rule, the
"The Sacred Flame" eyebrow and its `.closing-eyebrow` rule, and the
`--closing-stack-tight` token that existed only to space those two into the
headline. The `<h2>` is now the first child of `.closing-copy` and needs no
`marginTop`, so the inline style went with them.

**CTA is static.** Dropped the `magnetic` prop from `<Button>`, which is what
wrapped it in `<span class="magnetic">` for the cursor-attraction tween in
`useReveal.ts`. Nothing else changed: still an `<a href="https://kaleesuwari.com"
target="_blank" rel="noopener noreferrer">`, still `variant="outline"` +
`.closing-cta`, and the fill-on-hover state is intact. The `data-anim="fade"`
scroll reveal on its wrapper is a reveal, not movement, and stayed.

**Height came out of three places, all tokens:**
- `--closing-pad` (new) `clamp(40px, 4vw, 64px)` replaces the inline
  `paddingBlock: var(--space-major)` (80–128) via a new `.closing-inner` class.
- `--closing-max: 1080px` caps `.closing-grid` **inside** `.shell-wide` rather
  than narrowing the shell — every section keeps identical rails, and because
  the 7:6 bloom is sized by its grid column, the section height now *flattens*
  past ~1200px instead of growing with the viewport (495px at 1600 and at 1920).
- `--closing-copy-ratio` 0.62fr → **1.42fr**, so the copy column outweighs the
  media. This is the change that actually shrinks the photograph: at 1440 the
  bloom went 782×670 → 426×365. `--closing-gap` 40–96 → 28–60,
  `--closing-stack` 18–28 → 14–22, `--closing-spark` 16–26 → 13–20 (the sparks
  are pinned by percentage, so the offsets still land on the outline).

**Stacked (≤991.98px)** the bloom cap dropped 440 → 340px, 260px below 575.98,
and `.closing-copy` gained a `max-width: 560px; margin-inline: auto`. The copy
cap is for balance, not height — it costs ~27px because the lead wraps one line
further, but without it the full-width dividers ran 914px above a 340px bloom.

**Measured** (section height, media, copy — no horizontal overflow at any step,
all six `[data-anim]` at opacity 1):

| Viewport | Section | Media | Copy |
|---|---|---|---|
| 320×720 | 663 | 260×223 | 280×337 |
| 375×812 | 636 | 260×223 | 335×310 |
| 575×800 | 609 | 260×223 | 535×283 |
| 768×900 | 706 | 340×291 | 560×307 |
| 991×900 | 714 | 340×291 | 560×307 |
| 992×800 | 392 | 364×312 | 517×307 |
| 1200×800 | 464 | 429×368 | 610×338 |
| 1440×860 | **480** | 426×365 | 605×356 |
| 1600×900 | 495 | 424×363 | 602×367 |
| 1920×1000 | 495 | 421×361 | 599×367 |

At 1440 that is 480px against a 720px hero and a 112px nav — the section clears
a fold with room to spare, and media 426×365 against copy 605×356 is the
balance the brief asked for. 991 is the tall case (stacked, widest bloom cap).

**Contrast recomputed, and it had to be.** Shrinking the grid moved the copy
column ~200px left, which walks it *into* the brighter half of the
`radial-gradient(… at 12% 0%)` gold wash — the backdrop under the CTA is lighter
than it was. Worst case now: CTA **4.75:1** (14px, floor 4.5), lead 6.12,
headline 7.84, gold "Dheepam" 4.17 at 48px (large-text floor 3.0). The mandala
is no longer a factor at all: it starts at x=1180 and the CTA ends at 1028, so
the mask over the button reads 0.

**Chakra untouched**, as briefed — `.closing-mandala` / `.closing-mandala-disc`
and the `.mandala-spin` rotation are byte-identical, as is `.closing-kolam`. The
shorter section simply crops more off the disc's top and bottom, which is what
the cropped-linework treatment already intended.

`tsc --noEmit` clean, `npm run build` passes, `@layer bootstrap{` still at byte
1086 ahead of `@layer theme{` at 236624.

## Typography system (2026-08-11 rewrite)

Site-wide swap off the DM Serif Display / Manrope / DM Sans three-font system
onto **Fraunces (headings) + Inter (everything else)**, plus a new fixed-step
scale starting H1 at 64px. Requested as a **typography-only** change — no
layout, spacing, colour, imagery, copy, or component edits. Scope came in
clean: every heading/body/UI string in the app already routed through the
`.h1`–`.h6` / `.lead` / `.body*` / `.caption` / `.micro` / `.nav-link` / `.cta`
token classes in `src/index.css`, so the whole swap was a token-file edit —
zero component files touched.

**What changed, in `src/index.css`:**
- Google Fonts `@import` swapped to `Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400`
  + `Inter:wght@400;500;600;700`.
- `--font-serif` → Fraunces, `--font-sans` / `--font-ui` → Inter (both — see
  `CLAUDE.md` §4 for why they stay separate tokens).
- `.h6` moved into the shared Fraunces heading rule (`.h1,…,.h6`) instead of
  being a sans "hinge" — the brief wants H1–H6 uniformly on the heading face.
- Desktop scale: H1 64 / H2 48 / H3 36 / H4 28 / H5 24 / H6 20px (was 58/42/32/22/20/18).
  Tablet and mobile steps were rescaled proportionally to the *old* ladder's
  ratios (e.g. old tablet H1 was 0.828× desktop; new tablet H1 = 64×0.828 ≈ 52).
  New tablet: 52/44/34/27/23/19px. New mobile: 44/36/29/26/22/18px.
- `--fs-caption` 13→12px, to match the brief's "Caption / Labels: 12px" tier
  (now equal to `--fs-micro`, which was already 12).
- `.cta` and `.cta-sm` repointed from `--fs-caption`/`--fs-micro` to
  `--fs-body-sm` (14px) — otherwise shrinking `--fs-caption` to 12 would have
  pulled buttons under the brief's 14–16px nav/button floor.
- `--fs-lead` (20px desktop / 18 tablet+mobile) was **not** resized — the
  brief's scale doesn't name a "Lead" tier, so the existing larger-intro-copy
  size was left alone; it now renders in Inter automatically via `--font-sans`.
- A few components set their own inline heading `font-size` via `clamp()`
  ([FAQSection.tsx:90](Dheepam%20Website/src/components/FAQSection.tsx:90),
  [FestivalCustomsPage.tsx:132](Dheepam%20Website/src/components/FestivalCustomsPage.tsx:132),
  [LampLightingPage.tsx:106](Dheepam%20Website/src/components/LampLightingPage.tsx:106))
  on top of the `.h2`/`.h3` class. Those bespoke clamps were left untouched —
  they still inherit Fraunces/Inter through the class's `font-family`, only
  the literal size numbers are pre-existing and unrelated to this change.

Verified via `getComputedStyle` at desktop and 375px mobile widths (both fonts
report `status: loaded` in `document.fonts`); `tsc --noEmit` and `npm run
build` both clean.

## Decisions worth not re-litigating

- **Two-font system** (Fraunces for h1–h6 / Inter for everything else) with a
  fixed-step scale, H1 held at 64px — see §Typography system above.
- **One container** (1480px) for every section — verified identical rails. The
  **hero banner is the one exception at 1520px** (`--container-hero` /
  `.shell-hero`), set by the homepage brief. Don't generalise it to other
  sections.
- **The hero is a fixed pixel height, not a `vh` fraction** — 720/660/640/600.
  Reintroducing `vh` moves the fold with the browser chrome, which is what the
  brief was closing.
- **One decorative element per section.** Our Story's is still the spinning
  mandala, cropped into the top-right corner — the reference's floral corner did
  not earn a second node.
- **Our Story's plate is local and tool-built** (`tools/build-story-plate.py`),
  and its caption is intentionally gone. The "Pure, trusted…" line, by contrast,
  intentionally stayed — it is the only place that copy lives.
- **One CTA height on the homepage** — `--cta-h: 52px`, applied via `.home-page`
  / `.closing` with `padding-block: 0`. It is `min-height`, so a wrapped label on
  a phone grows the box instead of being clipped. Don't reintroduce per-variant
  heights there.
- **All six homepage eyebrows carry `EyebrowStar`**; inner-page eyebrows do not.
- **Our Story clears one desktop fold**, and pays for it with a section-local
  `padding-block` tighter than the ladder plus a 520px cap on the plate. The
  copy column drives that row, not the image — capping the plate alone changes
  nothing above 992px. Don't reinstate `.section`'s 64–104 there.
- **No homepage CTA moves.** Both that did (closing, Lamp Lighting Guide) had
  `magnetic` removed; `.magnetic` node count on the homepage is 0 and should
  stay 0 unless a brief asks otherwise.
- **The Products nav dropdown is two labels onto one destination** (Lamp Oil,
  Agarbathi → `#products`) by brief. That is the exact shape an earlier session
  removed as redundant, so it will look like a regression — it isn't.
- **Light theme**, with two intentional dark exceptions (hero photo, closing section).
- Small gold text uses `--ink-gold-text: #7D620D`; bright gold is ornament-only.
- **Bootstrap is the responsive layer; the design system is not.** Grid, display
  and flex utilities come from Bootstrap. Type, colour, spacing, CTAs and
  ornament stay in `index.css`. Don't reach for Bootstrap's buttons, cards or
  typography — they are outranked by design and will not apply.
- **The products fold is gone** — dropped for the compact-spacing brief. Don't
  reinstate `min-height: 100vh` on a section without a reason.
- **The Neivedhyam slider is five slides, by brief** — and its arrows live on
  the right rail, under the slide CTA, not on the left. Don't put them back
  opposite the CTA, and don't restore the four dropped offerings without asking.
- **Stock photography here is verified by looking at it**, not by its alt text —
  eight of the nine original Neivedhyam URLs were the wrong dish. `CLAUDE.md`
  §6 has the contact-sheet procedure.
- Neivedhyam recipes were preserved as slides — the *grouping* by festival was
  dropped, not the content. (The count came down to five separately, in the
  2026-08-12 brief.)
- **The hero plate is pre-framed to the hero's ratio, not cropped by CSS.**
  Reaching for `object-position` alone to fix hero framing is the trap that
  costs either the products or the copy column.

---

## Gotchas (things that bit before)

- **`npm ci` fails with `EPERM` while a dev server is running — and it deletes
  `node_modules` *before* it discovers it cannot.** `npm ci` wipes the tree as its
  first act, so a Vite server holding file handles leaves you with a **partially
  destroyed install**, not a no-op: this bit on 2026-08-12 and left 13 of 48
  packages, `react` among the casualties. The server was from an *earlier
  session* and was invisible until `preview_list` was checked. **Stop every
  preview server before any install that rewrites `node_modules`**
  (`preview_list` → `preview_stop`), then `rm -rf node_modules && npm ci`. The
  recovery is just that — the lockfile makes it a 5-second fix — but only if you
  recognise the EPERM for what it is instead of retrying it.
- **A green `vite build` does not mean the assets are real.** Vite hashes and
  emits whatever bytes it finds; it never validates that a `.webp` is an image.
  Git LFS pointers, truncated downloads and 0-byte files all build clean and fail
  only in the browser. If assets go through any indirection, check the *bytes*
  (`git cat-file -s`, magic-number check), not the build log. See §Deployment prep.
- **`Page` type:** import from `@/types`. Redeclaring it locally breaks every
  navigating component at once.
- **`.line-mask` clips descenders, and it did so for months.** The mask is
  `overflow: hidden` at line-box height, and both heading line-heights are
  tighter than Fraunces' 1.234em font box — H1 lost 5.9px at 64px, H2 1.9px at
  48. Homepage masks now carry `padding-bottom: 0.16em` + an equal negative
  margin. Any change to that padding must stay under the reveal's `yPercent:
  108` translate, or the hidden start state leaks ink: at 0.16em the exposed
  strip is 0.076em against ink that starts 0.142em in.
- **`.closing` reaches every page, not just the homepage.** Footer.tsx renders it
  under all five routes, so a `.closing …` rule is *not* homepage-scoped even
  though the section belongs to the homepage brief. The 52px CTA band and the
  mask padding are deliberately applied there; anything else that must stay
  home-only needs `.home-page` instead.
- **`.home-page` is the homepage scope hook** — a wrapper div in `App.tsx`, not a
  section class. Scoped rules live in the HOME PAGE block at the foot of
  `index.css`. Don't put homepage-only styling on bare `.cta` / `.line-mask`:
  those selectors reach the four inner pages.
- **Adding a link inside the Neivedhyam track needs the click guard.** The drag
  handlers are on `.nv-viewport`, so a drag that starts on a link both moves the
  track and fires the link on release. `suppressClick` + the viewport's
  `onClickCapture` exist for exactly that. **Nothing is inside the track today** —
  the slide CTA moved to the control row on 2026-08-12 — so the guard currently
  protects nothing, and it is kept precisely so the next in-track link does not
  have to rediscover the problem. Don't delete it as dead code.
- **`.cta`/`.cta-sm` size is `--fs-body-sm`, not `--fs-caption`/`--fs-micro`.**
  Looks like a mismatch next to `.caption`/`.micro` at 12px — it's deliberate,
  to keep buttons inside the 14–16px nav/button band. See §Typography system.
- **Fraunces is loaded at one weight (400) by choice, not a font limitation**
  (unlike the DM Serif Display it replaced, which was genuinely single-weight —
  Fraunces is variable and *can* go heavier). Only the `wght@…400` axis value
  is fetched, so requesting 500+ today falls back to faux-bold same as before;
  fix is to widen the `@import` range, not to assume the font can't do it.
- **Moving anything horizontally inside `.closing` changes its contrast.** The
  gold wash is a `radial-gradient(… at 12% 0%)`, so the backdrop gets *lighter*
  toward the left. Compacting the grid slid the copy column ~200px left and took
  the CTA from 5.59:1 to 4.75:1 against a 4.5 floor — nothing else changed. Any
  further narrowing of `--closing-max` / `--closing-copy-ratio` needs the ratio
  recomputed, not assumed.
- **The closing sparks are pinned to a measured number, not to padding.**
  `.closing-spark-*` uses `calc(1.35% - var(--closing-spark) / 2)` — 1.35% is
  where the `BLOOM` outline actually crosses the frame's horizontal centre. Edit
  the path and both offsets have to be re-derived, or the sparks float off it.
- **The closing mandala's fade lives on `.closing-mandala`, the spin on
  `.closing-mandala-disc`.** They are two elements for a reason: the disc
  rotates, and a mask on it would sweep the fade around with it and swing
  full-strength hairlines behind the gold CTA.
- **`overflow-x: clip` on `html`/`body` hides overflow bugs.** It is there so the
  bleeding decorative layers don't create a scroll container (`hidden` would kill
  the sticky festival switcher), but it also means `scrollWidth === innerWidth`
  even when a child is genuinely too wide. Test by walking the DOM for
  `getBoundingClientRect().width > innerWidth`, not by checking for a scrollbar —
  that is how the 399px CTA at 375px went unnoticed.
- **Nav height comes from `--nav-h` / `--nav-h-scrolled`** (112/92 desktop,
  84/72 ≤1199.98, 74/64 ≤575.98). `<nav>` publishes the live value as
  `--nav-cur`; the bar, logo, hero top pad and mobile sheet all read it. Still
  hard-coded and unaffected because they only over-clear: `App.tsx` scroll offset
  (−104), `FestivalCustomsPage` sticky `top: 92`, `PageHero` `paddingTop: 172`.
- **Neivedhyam slider reads `indexRef`, not `index` state.** Reading state
  through a closure made rapid clicks skip a slide.
- **`aspect-ratio` set inline on an image frame cannot be flattened by a media
  query** — an inline style beats any class. Both plates that fold to full width
  (`.story-plate`, `.fest-card-media`) keep their ratio in `index.css` for that
  reason. A full-width 4:5 is 1075px tall on a 900px tablet.
- **A `[data-anim]` element reporting opacity 1 in the Browser pane may never
  have been animated at all.** `useReveal` scans inside `requestAnimationFrame`,
  which doesn't fire when the pane isn't compositing, and the hidden start state
  is applied in JS — so the check meant to catch a stuck reveal passes vacuously.
  Tell them apart by `data-anim-ready` / `data-spin-ready`: absent means the scan
  never ran (the mandalas also carry no transform). `CLAUDE.md` §7.6 has the
  manual drive-it-yourself procedure.
- **The Our Story plate is locked to 14:15 at every width, and neither direction
  has slack.** *Taller* than 14:15 makes `cover` crop horizontally, and *shorter*
  crops vertically through the product — the supplied plate's oil bottle spans 78%
  of the frame height, so a 4:3 window clips its cap at every `object-position`
  that keeps the base. That is why the 992–1199.98 band centres the plate rather
  than stretching it, and why the ≤991.98px 4:3 flatten was removed on 2026-08-12
  (along with `object-position: center bottom`, which had nothing left to bias).
  The asset is authored at exactly 520×557, so the shipped ratio is a zero-crop
  fit — changing it means re-cropping the source, not re-tuning CSS.
- **Flexbox breaks lines before it shrinks items.** `.nv-controls-group` is
  `flex-wrap: nowrap` on purpose: with `wrap` on, the 992–1199.98 band pushed the
  counter and arrows onto a second row instead of narrowing the CTA beside them.
  `nowrap` forces the squeeze onto the one elastic member. Any group that must
  stay on one row while a member gives way needs `nowrap`, not `wrap` plus hope.
- **Smooth scrolling is unobservable in the Browser pane.**
  `scrollTo({behavior:'smooth'})` never advances when the pane isn't
  compositing, so a deep link reads as `scrollY: 0`. Re-test with
  `behavior: 'auto'` to prove the geometry, then confirm in a real browser.
- **`setPointerCapture` throws** on an unrecognised pointerId — it stays wrapped
  in try/catch so a drag survives.
- **Removing a file mid-session can wedge Vite HMR** (and once killed the dev
  server). If the page goes blank but `tsc`/`build` pass, restart the preview.
- **CSSOM (`sheet.cssRules`) is unreadable here.** Verify styles via
  `getComputedStyle`, not by walking stylesheets.
- **The pane's console buffer is stale and survives a server restart.** It
  replayed `LotusGlyph is not defined` for a component deleted sessions earlier,
  identically after `preview_stop`/`preview_start` and a fresh navigate — and the
  dep hash in the trace matched the *live* one, so a mismatched hash is not the
  tell. Install your own `error`/`unhandledrejection`/`console.error` capture and
  exercise the changed surface instead of debugging what it reports.
- **`.shell-wide`'s gutter is padding inside the container box**, so
  `getBoundingClientRect()` on it is the padding box, not the content rail — at
  1920 the shell reads 215→1695 while content runs 275→1635. A right-aligned
  child looking 60px short of the rail is this, not a bug.
- **`.story` beats `.section` on source order alone** (both 0,1,0). Moving the
  OUR STORY block above `.section` in `index.css` silently restores the 64–104
  padding and Our Story stops clearing a fold.
- **Measure the hero from `offsetWidth`, not `getBoundingClientRect()`.** The
  intro tween scales `.hero-media` to 1.1, and with rAF frozen the rect comes
  back ~9% wide with a negative `left` — every derived percentage is then wrong.
  The layout box is transform-free. Same reason `gsap` isn't on `window`: to
  force reveals to their end state, `await import('/src/hooks/useReveal.ts')`
  then `gsap.globalTimeline.progress(1, true)`.
- **`.hero-wash` is load-bearing for contrast, and it is not eyeballable.** The
  re-framed plate is bright amber behind the copy. The shipped ramp was solved
  numerically — draw the plate to a canvas with the same `cover`/`object-position`
  maths, composite the parsed gradient, and take the *lightest* pixel under the
  text ink. Sampling the element's whole box instead of the ink reads ~3 points
  low and will send you chasing a failure that isn't there.

---

## Verification checklist

Before calling any change done:

- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes
- [ ] No element wider than the viewport at 320 / 576 / 992 / 1200 / 1440 / 1920
      — walk `getBoundingClientRect()`, don't trust `scrollWidth` (§Gotchas)
- [ ] All `[data-anim]` elements settle to opacity 1 — and `data-anim-ready` is
      actually set, or the read is a false pass (§Gotchas)
- [ ] No dead nav/footer anchors
- [ ] Contrast ≥ 4.5:1 for small text — computed, not eyeballed
- [ ] Bootstrap still confined to its layer: `@layer bootstrap{` precedes
      `@layer theme{` in `dist/assets/index-*.css`
