import logoImg from '@/imports/dheepam-neww.png'
import closingImg from '@/imports/closing-ritual.webp'
import Button from '@/components/Button'
import Button02 from '@/components/shadcn-space/button/button-02'
import type { Page } from '@/types'


interface FooterProps {
  setPage: (p: Page) => void
  scrollToSection: (id: string) => void
  /* The closing band belongs to the homepage but `Footer` renders under all
     five routes, so the shiny CTA has to know which one it is on. It is the
     only thing this prop does — see the CTA below. */
  currentPage: Page
}

/* Lotus-bloom mask for the closing CTA photograph. A 7:6 ellipse of unit radius
 * `1 + 0.026·cos(12θ) + 0.008·cos(6θ)`, sampled at 48 points (four per lobe, so
 * every crest and trough lands on a sample) and smoothed through Catmull-Rom.
 * Twelve shallow lobes read as petals; eight gave the ellipse sharp tips at the
 * major axis, and an irregular wave read as a blob rather than a bloom.
 *
 * The crest sits at 1.35% of the frame height from the top and the same from the
 * bottom — `.closing-spark-*` in index.css pins the gold sparks to those two
 * numbers, so re-measure them if this path ever changes. One constant drives the
 * clip and the outline, so the two can never drift apart. */
const BLOOM = {
  w: 1000,
  h: 857,
  d: 'M995.0 428.5C995.0 446.4 984.7 465.1 977.3 482.3C969.9 499.5 956.6 514.7 950.4 531.7C944.1 548.8 944.5 566.8 939.8 584.4C935.1 601.9 932.4 621.6 922.0 637.0C911.7 652.3 893.0 664.2 877.6 676.4C862.3 688.7 843.8 697.4 829.7 710.6C815.6 723.7 806.8 741.2 793.1 755.3C779.4 769.4 765.6 786.3 747.5 795.3C729.4 804.2 705.4 805.9 684.2 809.0C663.1 812.1 641.0 810.0 620.7 813.8C600.3 817.7 582.2 827.0 562.1 832.3C542.0 837.5 520.7 845.4 500.0 845.4C479.3 845.4 458.0 837.5 437.9 832.3C417.8 827.0 399.7 817.7 379.3 813.8C359.0 810.0 336.9 812.1 315.8 809.0C294.6 805.9 270.6 804.2 252.5 795.3C234.4 786.3 220.6 769.4 206.9 755.3C193.2 741.2 184.4 723.7 170.3 710.6C156.2 697.4 137.7 688.7 122.4 676.4C107.0 664.2 88.3 652.3 78.0 637.0C67.6 621.6 64.9 601.9 60.2 584.4C55.5 566.8 55.9 548.8 49.6 531.7C43.4 514.7 30.1 499.5 22.7 482.3C15.3 465.1 5.0 446.4 5.0 428.5C5.0 410.6 15.3 391.9 22.7 374.7C30.1 357.5 43.4 342.3 49.6 325.3C55.9 308.2 55.5 290.2 60.2 272.6C64.9 255.1 67.6 235.4 78.0 220.0C88.3 204.7 107.0 192.8 122.4 180.6C137.7 168.3 156.2 159.6 170.3 146.4C184.4 133.3 193.2 115.8 206.9 101.7C220.6 87.6 234.4 70.7 252.5 61.7C270.6 52.8 294.6 51.1 315.8 48.0C336.9 44.9 359.0 47.0 379.3 43.2C399.7 39.3 417.8 30.0 437.9 24.7C458.0 19.5 479.3 11.6 500.0 11.6C520.7 11.6 542.0 19.5 562.1 24.7C582.2 30.0 600.3 39.3 620.7 43.2C641.0 47.0 663.1 44.9 684.2 48.0C705.4 51.1 729.4 52.8 747.5 61.7C765.6 70.7 779.4 87.6 793.1 101.7C806.8 115.8 815.6 133.3 829.7 146.4C843.8 159.6 862.3 168.3 877.6 180.6C893.0 192.8 911.7 204.7 922.0 220.0C932.4 235.4 935.1 255.1 939.8 272.6C944.5 290.2 944.1 308.2 950.4 325.3C956.6 342.3 969.9 357.5 977.3 374.7C984.7 391.9 995.0 410.6 995.0 428.5Z',
}

/** Four-point gold spark, pinned to the crown and foot of the bloom. */
function Spark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c1.1 8.2 2.7 9.8 12 12-9.3 2.2-10.9 3.8-12 12-1.1-8.2-2.7-9.8-12-12C9.3 9.8 10.9 8.2 12 0Z" />
    </svg>
  )
}

/* ── Footer navigation ──
   These four columns mirror the header's menu, which is the whole point of the
   set: `Navbar.tsx`'s `navLinks` is Home · Products (Lamp Oil, Agarbathi) · Lamp
   Lighting · Festivals & Traditions (Festival Customs, Neivedhyam Dishes &
   Recipes) · Contact Us, and every one of those now appears here at the same
   level of the hierarchy it has in the bar. Three top-level entries carry no
   dropdown in the nav, so they group under `Menu` rather than getting a column
   each; the two that do carry one keep their own column with their own children.

   **Removed as outdated:** the four items that used to sit under a `Lamp
   Lighting` heading — *Why We Light Lamps*, *Benefits*, *Auspicious Days*,
   *Traditional Practices*. None of them was ever a menu item and all four
   resolved to the same `lamp-lighting` page as the heading above them, so the
   column was one destination advertised five times. *Festival Overview* went the
   same way: `#festivals` is reached by the nav's own `Festivals & Traditions`
   entry, which is in `Menu` now.

   **Repointed:** *Neivedhyam Dishes & Recipes* went to the homepage `#neivedhyam`
   slider; the nav sends it to the dishes block on the Festival Customs page. It
   now matches the nav, anchor and all.

   Kept, though neither is a menu item: *Shop All Products*, the footer's only
   route to the store, and the two `Engage` entries — the Knowledge page's only
   other entrance is the sticky launcher, and the FAQ has none at all. */
const footerLinks = {
  Menu: [
    { label: 'Home', page: 'home' as Page },
    { label: 'Products', section: 'products' },
    { label: 'Lamp Lighting', page: 'lamp-lighting' as Page },
    { label: 'Festivals & Traditions', section: 'festivals' },
    { label: 'Contact Us', page: 'contact' as Page },
  ],
  Products: [
    { label: 'Lamp Oil', section: 'products' },
    { label: 'Agarbatti', section: 'products' },
    { label: 'Shop All Products', href: 'https://kaleesuwari.com' },
  ],
  'Festivals & Traditions': [
    { label: 'Festival Customs', page: 'festival-customs' as Page },
    { label: 'Neivedhyam Dishes & Recipes', page: 'festival-customs' as Page, anchor: 'neivedhyam-dishes' },
  ],
  Engage: [
    /* The quiz now lives on its own page, not a homepage section. */
    { label: 'Test Your Knowledge', page: 'knowledge' as Page },
    { label: 'FAQ', section: 'faq' },
  ],
}

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
  { label: 'Facebook', href: 'https://facebook.com', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
  { label: 'YouTube', href: 'https://youtube.com', icon: <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /> },
]

export default function Footer({ setPage, scrollToSection, currentPage }: FooterProps) {
  /* The homepage brief (2026-08-13) is home-only and explicitly forbids
     touching the inner pages, so the shiny pill is chosen here rather than in
     CSS: `.closing` is not homepage-scoped (CLAUDE.md §4), and any `.closing …`
     rule would land on all four inner pages too. One props object, two
     renderers — identical destination, label, class and 44px box either way;
     only the reflection differs. */
  const closingCta = {
    href: 'https://kaleesuwari.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'closing-cta',
    children: 'Shop on Kaleesuwari',
  } as const

  const handleLink = (link: { label: string; section?: string; page?: Page; href?: string; anchor?: string }) => {
    if (link.href) { window.open(link.href, '_blank', 'noopener,noreferrer') }
    else if (link.page) {
      setPage(link.page)
      /* Deep link into a block on the destination page — same 260ms the nav's
         dropdown uses, because `setPage` scrolls to top first and the anchor has
         to exist before it is looked up. */
      if (link.anchor) setTimeout(() => scrollToSection(link.anchor as string), 260)
    }
    else if (link.section) { setPage('home'); setTimeout(() => scrollToSection(link.section as string), 120) }
  }

  return (
    <footer className="relative">
      {/* ── Closing section ──
          The one deliberately dark surface on the page: deep maroon into
          burgundy with gold, so the homepage lands on a brand note rather than
          fading out. Light theme resumes for the footer links below. */}
      <section className="closing relative overflow-hidden">
        <div className="closing-mandala" aria-hidden="true">
          <div className="closing-mandala-disc mandala-spin" />
        </div>
        <div className="closing-kolam" aria-hidden="true" />

        <div className="shell-wide closing-inner relative">
          <div className="closing-grid">
            <figure className="closing-media">
              {/* The wipe lives on the frame, not the figure — `mask` clips to the
                  border box and would swallow the sparks that sit outside it. */}
              <div className="closing-media-frame" data-anim="mask">
                <svg viewBox={`0 0 ${BLOOM.w} ${BLOOM.h}`} role="img" aria-label="A lamp being lit with Dheepam lamp oil">
                  <defs>
                    <clipPath id="closing-bloom">
                      <path d={BLOOM.d} />
                    </clipPath>
                  </defs>
                  <image
                    href={closingImg}
                    width={BLOOM.w}
                    height={BLOOM.h}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#closing-bloom)"
                  />
                  <path className="closing-media-edge" d={BLOOM.d} fill="none" strokeWidth="2.4" />
                </svg>
              </div>
              <Spark className="closing-spark closing-spark-top" />
              <Spark className="closing-spark closing-spark-bottom" />
            </figure>

            <div className="closing-copy">
              {/* Heading opens the column — the lotus glyph and "The Sacred Flame"
                  eyebrow were removed so the section reads compact. */}
              <h2 className="h2 closing-head" data-anim="line">
                <span className="line-mask"><span className="line-inner">Ready to bring</span></span>
                <span className="line-mask"><span className="line-inner">
                  <em className="serif-italic closing-accent">Dheepam</em> home?
                </span></span>
              </h2>

              <div
                className="closing-divider"
                aria-hidden="true"
                data-anim="fade"
                data-delay="0.14"
                style={{ marginTop: 'calc(var(--closing-stack) * 1.35)' }}
              >
                <i />
              </div>

              <p
                className="lead closing-lead"
                data-anim="fade"
                data-delay="0.18"
                style={{ marginTop: 'var(--closing-stack)' }}
              >
                Every lamp you light carries the same intention. Bring the purity of
                Dheepam into your own daily ritual.
              </p>

              <div data-anim="fade" data-delay="0.24" style={{ marginTop: 'calc(var(--closing-stack) * 1.6)' }}>
                {/* Gold, like every other CTA since 2026-08-12 — and this is
                    the one the variant was originally written for (the
                    Kaleesuwari destination). It was `outline`, a gold hairline
                    on the maroon band; the filled pill reads as the primary
                    action it is, and #111 on #C9A227 is 7.71:1 with the block
                    itself 3.68:1 against the band behind it.

                    On the homepage it is the shiny CTA (2026-08-13). Off the
                    homepage it is the same pill it has always been — the brief
                    was homepage-only and `.closing` reaches every route. */}
                {currentPage === 'home'
                  ? <Button02 {...closingCta} />
                  : <Button variant="gold" {...closingCta} />}
              </div>
              {/* The second `.closing-divider` that used to sit here — a gold
                  hairline with a centre diamond — read as an underline drawn
                  under the button and is gone per the brief. The one above the
                  lead stays: it separates the headline from the copy. */}
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: '#F8F0E3', position: 'relative' }}>
      <div className="pattern-jali absolute inset-0" />

      {/* Asymmetric on purpose. The block used to be `paddingBlock`, so the
          bottom rail carried the same 44–68px as the top — on top of the legal
          row's own 22px `paddingTop` that read as a 90px void under the
          copyright line. The bottom now matches the row's internal rhythm
          (22–30px), which is the spacing the rest of the footer uses. */}
      <div className="shell-wide relative" style={{ paddingTop: 'clamp(44px, 4.4vw, 68px)', paddingBottom: 'clamp(22px, 2.2vw, 30px)' }}>
        <div className="grid12" style={{ rowGap: 'var(--space-content)' }}>
          <div className="col-footer-brand">
            <button onClick={() => setPage('home')} style={{ marginBottom: 24, display: 'block' }} aria-label="Dheepam — home">
              {/* 54 → 64px: a slight step up so the mark carries the brand
                  column without competing with the nav's own logo. `width: auto`
                  keeps the 204:200 proportion — never set both. */}
              <img src={logoImg} alt="Dheepam" width={204} height={200} loading="lazy" decoding="async" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
            </button>
            <p className="body-sm" style={{ maxWidth: 300, marginBottom: 28 }}>
              A devotional lifestyle brand by Kaleesuwari — bringing purity, tradition,
              and the sacred flame into every home.
            </p>
            <div className="flex" style={{ gap: 14 }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: 'rgba(17,17,17,0.45)', transition: 'color .3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#8F1D25')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(17,17,17,0.45)')}
                >
                  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-footer-links">
              <h5 className="micro t-ink" style={{ marginBottom: 18 }}>
                {category}
              </h5>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <button onClick={() => handleLink(link)} className="footer-link text-left">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
          style={{ marginTop: 'clamp(34px, 3.4vw, 52px)', paddingTop: 22, borderTop: '1px solid rgba(17,17,17,0.1)', gap: 16 }}
        >
          <p className="body-sm" style={{ fontSize: 12.5 }}>
            © 2025 Dheepam by Kaleesuwari Refinery Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex" style={{ gap: 28 }}>
            {['Privacy Policy', 'Terms & Conditions'].map(label => (
              <button key={label} className="footer-link" style={{ fontSize: 12.5 }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
