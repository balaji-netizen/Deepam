import { useState, useEffect } from 'react'
import Button from '@/components/Button'
import logoImg from '@/imports/dheepam-neww.png'
import type { Page } from '@/types'


interface NavbarProps {
  currentPage: Page
  setPage: (p: Page) => void
  scrollToSection: (id: string) => void
}

/* Lamp Lighting carries no dropdown: every item under it resolved to the same
   destination as the parent. Products carries one by brief — the two SKUs the
   site sells, named. Both land on `#products`, which is where both tiles live
   (the section has no per-product anchors), so this menu is deliberately two
   labels onto one destination. Festivals & Traditions keeps its own, where the
   two children are genuinely different destinations. */
const navLinks = [
  { label: 'Home', action: 'home' as Page },
  {
    label: 'Products',
    section: 'products',
    dropdown: [
      { label: 'Lamp Oil', section: 'products' },
      { label: 'Agarbathi', section: 'products' },
    ],
  },
  { label: 'Lamp Lighting', action: 'lamp-lighting' as Page },
  {
    label: 'Festivals & Traditions',
    section: 'festivals',
    dropdown: [
      { label: 'Festival Customs', page: 'festival-customs' as Page },
      { label: 'Neivedhyam Dishes & Recipes', page: 'festival-customs' as Page, anchor: 'neivedhyam-dishes' },
    ],
  },
  /* `cta` lifts this entry out of the text-link row and renders it with the
     site's own `<Button>` instead — same `.cta` / `.cta-solid` classes, tokens
     and hover as every other Dheepam button, at `cta-sm`'s padding so a 48px
     box sits comfortably in a bar that is 74–112px tall. It keeps its
     `setPage('contact')` handler; only the treatment changed. */
  { label: 'Contact Us', action: 'contact' as Page, cta: true },
]

export default function Navbar({ currentPage, setPage, scrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = (link: (typeof navLinks)[number]) => {
    setMobileOpen(false)
    setActiveDropdown(null)
    if ('action' in link && link.action) {
      setPage(link.action as Page)
    } else if ('section' in link && link.section) {
      if (currentPage !== 'home') setPage('home')
      setTimeout(() => scrollToSection(link.section as string), 120)
    }
  }

  const handleDropdownItem = (item: { label: string; section?: string; page?: Page; anchor?: string }) => {
    setActiveDropdown(null)
    setMobileOpen(false)
    if (item.page) {
      setPage(item.page)
      /* Deep link into a block on the destination page. `setPage` scrolls to
         top first, so this has to wait for the new page to mount. */
      if (item.anchor) setTimeout(() => scrollToSection(item.anchor as string), 260)
    } else if (item.section) {
      if (currentPage !== 'home') setPage('home')
      setTimeout(() => scrollToSection(item.section as string), 120)
    }
  }

  /* The bar dissolves into the banner at the top of the homepage: no ivory
     surface, no hairline, light type over a gradient scrim that fades to
     nothing well below the bar (see `.nav-scrim`). It is *only* that state —
     the homepage, unscrolled, sheet closed. Every inner page opens on
     `PageHero`'s ivory ground, where a transparent bar would strand light type
     on white, and once past 40px of scroll the bar takes its ivory surface back
     because what is behind it is then ordinary light sections. */
  const overHero = currentPage === 'home' && !scrolled && !mobileOpen

  return (
    <nav
      /* `z-50` MUST keep a space before the interpolation. Written as
         `z-50${...}` the scanner reads the candidate as `z-50$…`, never emits
         `.z-50`, and the bar silently falls to `z-index: auto` — where the hero
         (later in tree order, positioned) paints straight over it and the whole
         menu becomes invisible and unclickable. See CLAUDE.md §10. */
      className={`fixed top-0 left-0 right-0 z-50 ${overHero ? 'nav-over-hero' : ''}`}
      style={{
        background: overHero
          ? 'transparent'
          : scrolled ? 'rgba(255, 253, 247, 0.92)' : 'rgba(255, 253, 247, 0.97)',
        // Blurring the banner would put a sharp edge exactly where the blend has
        // to be invisible — the blurred strip would end on the bar's own bottom.
        backdropFilter: overHero ? 'none' : 'blur(18px) saturate(1.25)',
        // Kept at 1px in both states so only the colour animates.
        borderBottom: `1px solid ${overHero ? 'transparent' : 'rgba(17,17,17,0.07)'}`,
        transition: 'background .6s var(--ease-out-soft), border-color .6s var(--ease-out-soft)',
        // Current bar height, published so the mobile sheet can size against the
        // real number instead of a hard-coded guess.
        ['--nav-cur' as string]: scrolled ? 'var(--nav-h-scrolled)' : 'var(--nav-h)',
      }}
    >
      {/* The blend itself — a top-down gradient that carries the banner's own
          deep ground through the bar and reaches zero 96px *below* it, so there
          is no edge anywhere to read as a boundary. It is also what buys the
          light type its contrast over the product photography, which rises into
          the bar at wide viewports. Sits behind the content: `.shell-wide` below
          is positioned, so it paints on top. */}
      <div className="nav-scrim" aria-hidden="true" />

      <div className="shell-wide relative">
        {/* Bar grows with the logo so the mark has room to breathe without
            crowding the links. */}
        <div className="flex items-center justify-between" style={{ height: 'var(--nav-cur)', transition: 'height .6s var(--ease-out-soft)' }}>
          <button onClick={() => setPage('home')} className="flex-shrink-0" aria-label="Dheepam — home">
            <img
              src={logoImg}
              alt="Dheepam"
              width={84}
              height={84}
              /* Sized off the bar rather than pinned to 84/64, so the mark keeps
                 its proportion as the bar shortens on tablet and phone. */
              style={{ height: 'calc(var(--nav-cur) * 0.75)', width: 'auto', objectFit: 'contain', transition: 'height .6s var(--ease-out-soft)' }}
            />
          </button>

          {/* Desktop — wider gaps now that the link set is shorter, so the
              row still reads as a deliberate composition rather than a huddle.
              Switches at Bootstrap's lg (992px) rather than Tailwind's 1024, so
              the 992–1199 band gets the full nav: five links plus the mark
              measure ~653px against a 924px container there. */}
          <div className="d-none d-lg-flex items-center" style={{ gap: 'clamp(24px, 2.8vw, 42px)' }}>
            {navLinks.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => 'dropdown' in link ? setActiveDropdown(link.label) : setActiveDropdown(null)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {'cta' in link && link.cta ? (
                  /* No gold underline here: that is the text row's active/hover
                     language, and a filled gold pill already carries more
                     emphasis than it. The current-page state is exposed to
                     assistive tech instead. `gold` since 2026-08-12 — the one
                     CTA colour the whole site now uses. */
                  <Button
                    onClick={() => handleNav(link)}
                    variant="gold"
                    size="sm"
                    className="nav-cta"
                    aria-current={currentPage === 'contact' ? 'page' : undefined}
                  >
                    {link.label}
                  </Button>
                ) : (
                <button
                  onClick={() => handleNav(link)}
                  className="nav-link flex items-center gap-1.5"
                  data-active={
                    (link.label === 'Home' && currentPage === 'home') ||
                    (link.label === 'Lamp Lighting' && currentPage === 'lamp-lighting') ||
                    (link.label === 'Festivals & Traditions' && currentPage === 'festival-customs') ||
                    (link.label === 'Contact Us' && currentPage === 'contact')
                  }
                >
                  {/* The kolam star that used to prefix this label on hover and
                      on the active page is removed by brief (2026-08-12). The
                      gold underline is the whole hover language now, and the
                      active state keeps that underline alongside its maroon
                      label, so neither is signalled by colour alone. */}
                  {link.label}
                  {'dropdown' in link && (
                    /* Opacity moved off the inline style so the over-hero state
                       can lift it — an inline value outranks every rule. */
                    <svg className="nav-chev" width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                      <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  )}
                </button>
                )}

                {'dropdown' in link && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2"
                    style={{
                      minWidth: 264,
                      background: '#FFFDF7',
                      border: '1px solid rgba(17,17,17,0.08)',
                      boxShadow: '0 24px 60px -18px rgba(17,17,17,0.16)',
                      padding: '10px 0',
                      zIndex: 60,
                    }}
                  >
                    {link.dropdown?.map(item => (
                      <button
                        key={item.label}
                        onClick={() => handleDropdownItem(item)}
                        className="w-full text-left"
                        style={{ padding: '12px 24px', fontSize: 13.5, color: '#333333', transition: 'color .3s, background .3s' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#8F1D25'
                          e.currentTarget.style.background = 'rgba(201,162,39,0.07)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#333333'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile trigger */}
          {/* The bars take `currentColor` rather than a hard-coded `#111` so
              `.nav-burger` can flip them to ivory over the banner. */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="d-lg-none p-2 nav-burger" aria-label="Menu" aria-expanded={mobileOpen}>
            <span style={{ display: 'block', width: 24, height: 1, background: 'currentColor', transform: mobileOpen ? 'translateY(3px) rotate(45deg)' : 'none', transition: 'transform .45s var(--ease-out-soft)' }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'currentColor', marginTop: 5, opacity: mobileOpen ? 0 : 1, transition: 'opacity .3s' }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'currentColor', marginTop: 5, transform: mobileOpen ? 'translateY(-9px) rotate(-45deg)' : 'none', transition: 'transform .45s var(--ease-out-soft)' }} />
          </button>
        </div>
      </div>

      {/* Scroll progress. Its track is an ink hairline, which is the one thing
          left that would draw a line across the banner — dropped over the hero,
          where the bar carries no rule of its own. */}
      <div style={{ height: 1, background: overHero ? 'transparent' : 'rgba(17,17,17,0.06)', opacity: scrolled ? 1 : 0, transition: 'opacity .4s, background .6s var(--ease-out-soft)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#C9A227' }} />
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          className="d-lg-none"
          style={{
            background: '#FFFDF7',
            /* Positioned so it paints above `.nav-scrim`, which overhangs the
               bar by 96px and would otherwise cross the sheet's first entry
               while it fades out. */
            position: 'relative',
            /* Was `calc(100vh - 76px)`, a height the bar has not been since it
               grew to 112/92 — the sheet overshot the viewport by ~36px and its
               last link sat under the fold. `dvh` also keeps it correct while
               mobile browser chrome collapses on scroll. */
            height: 'calc(100dvh - var(--nav-cur))',
            overflowY: 'auto',
            padding: '24px var(--gutter) 56px',
          }}
        >
          {navLinks.map(link => (
            'cta' in link && link.cta ? (
              /* The sheet's own entries are 24px headings with a hairline under
                 each; a button in that stack needs to sit clear of the rule
                 rather than inside it, so this row drops the border and takes
                 the full column width. Same `<Button>`, same variant — only the
                 24px `padding-top` and the full-width block are sheet-specific. */
              <div key={link.label} style={{ paddingTop: 26 }}>
                <Button
                  onClick={() => handleNav(link)}
                  variant="gold"
                  size="sm"
                  className="nav-cta nav-cta-sheet"
                  aria-current={currentPage === 'contact' ? 'page' : undefined}
                >
                  {link.label}
                </Button>
              </div>
            ) : (
            <div key={link.label} style={{ borderBottom: '1px solid rgba(17,17,17,0.07)', padding: '18px 0' }}>
              <button onClick={() => handleNav(link)} className="text-left w-full h3" style={{ fontSize: 24 }}>
                {link.label}
              </button>
              {'dropdown' in link && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {link.dropdown?.map(item => (
                    <button
                      key={item.label}
                      onClick={() => handleDropdownItem(item)}
                      className="text-left body-sm"
                      style={{ paddingLeft: 2 }}
                    >
                      — {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            )
          ))}
        </div>
      )}
    </nav>
  )
}
