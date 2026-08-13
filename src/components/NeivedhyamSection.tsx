import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Button from '@/components/Button'
import EyebrowStar from '@/components/EyebrowStar'
import SplitLines from '@/components/SplitLines'
import { gsap, prefersReducedMotion } from '@/hooks/useReveal'
import type { SetPage } from '@/types'

interface NeivedhyamSectionProps {
  setPage: SetPage
  /** Used to deep-link the section CTA into the dishes block on the detail page. */
  scrollToSection: (id: string) => void
}

/* One slide per offering — **five, named and ordered by brief** (2026-08-12):
   Paal Payasam, Boondi Laddu, Puliyodarai, Sakkarai Pongal, Kesari Bath. The
   whole set replaces the five remote Unsplash URLs this list used to carry.

   **Every plate is now local and supplied.** `Images/<Dish Name>.png` →
   `tools/build-dish-plates.py` → `src/imports/dishes/*.webp`, all five at
   1200×900 (the slide's own 4:3, so nothing is cropped) and 161–241KB. They are
   also one photographic set — the same brass bowl on the same gold ground, lit
   by the same lamps — which the nine-URL stock mix never was, and they take the
   last third-party origin off this section's critical path. Verified as a
   contact sheet at the shipped crop before wiring in, per CLAUDE.md §6. */
import paalPayasam from '@/imports/dishes/paal-payasam.webp'
import boondiLaddu from '@/imports/dishes/boondi-laddu.webp'
import puliyodarai from '@/imports/dishes/puliyodarai.webp'
import sakkaraiPongal from '@/imports/dishes/sakkarai-pongal.webp'
import kesariBath from '@/imports/dishes/kesari-bath.webp'

/* Descriptions are held to the length of each other — a longer one takes an
   extra line in the folded column and the section grows with it. */
const offerings = [
  {
    name: 'Paal Payasam',
    note: 'Offered at dawn · Poured into brass',
    type: 'Milk Offering',
    desc: 'Raw rice simmered slowly in thickened milk and sugar, scented with cardamom — the first offering poured at the temple sanctum.',
    image: paalPayasam,
  },
  {
    name: 'Boondi Laddu',
    note: 'Offered at Deepavali · Shared as prasadam',
    type: 'Sweet Offering',
    desc: 'Golden gram-flour pearls fried in ghee, bound in cardamom syrup with cashews, and pressed by hand into festival spheres.',
    image: boondiLaddu,
  },
  {
    name: 'Puliyodarai',
    note: 'Offered at noon · Wrapped in banana leaf',
    type: 'Savoury Rice',
    desc: 'Tamarind rice tempered with sesame, curry leaves, and roasted lentils — the tangy offering that keeps through a long temple day.',
    image: puliyodarai,
  },
  {
    name: 'Sakkarai Pongal',
    note: 'Offered at sunrise · Thai Pongal',
    type: 'Festival Pongal',
    desc: 'New-harvest rice and moong dal cooked with jaggery, ghee, cashews, and cardamom until the pot rises over with abundance.',
    image: sakkaraiPongal,
  },
  {
    name: 'Kesari Bath',
    note: 'Offered after the evening lamp · Saffron',
    type: 'Semolina Sweet',
    desc: 'Roasted semolina swirled with ghee, saffron, and sugar, studded with cashews and raisins — a swift offering for any auspicious day.',
    image: kesariBath,
  },
]

const SWIPE_THRESHOLD = 0.12 // fraction of a slide width that commits a change

export default function NeivedhyamSection({ setPage, scrollToSection }: NeivedhyamSectionProps) {
  const [index, setIndex] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideW = useRef(0)
  const drag = useRef({ active: false, startX: 0, delta: 0, pointerId: -1 })

  /* The slide copy now contains a link, so a drag that *starts* on it would
     advance the track and then fire the button's click on release. Set on
     pointerup when the pointer actually travelled, cleared on the next
     pointerdown, and read by the capture-phase handler on the viewport. */
  const suppressClick = useRef(false)

  /* `indexRef` — not the `index` state — is the source of truth for every
     handler. Reading state through a closure let a second click act on a stale
     value and skip a slide; a ref is always current. */
  const indexRef = useRef(0)

  const clamp = (i: number) => Math.max(0, Math.min(offerings.length - 1, i))

  /* The track is positioned in pixels rather than percentages so a live drag
     offset can be added to it directly. Re-measured on resize. */
  const settle = useCallback((i: number, animate = true) => {
    if (!trackRef.current) return
    const x = -i * slideW.current
    if (animate && !prefersReducedMotion()) {
      gsap.to(trackRef.current, { x, duration: 0.85, ease: 'power3.out', overwrite: true })
    } else {
      gsap.set(trackRef.current, { x })
    }
  }, [])

  const goTo = useCallback((i: number) => {
    const next = clamp(i)
    indexRef.current = next
    setIndex(next)
    settle(next)
    if (prefersReducedMotion()) return
    // Only the incoming copy animates — the imagery is already in motion.
    const copy = trackRef.current?.children[next]?.querySelector('.nv-copy')
    if (copy) {
      gsap.fromTo(copy.children,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out', overwrite: true })
    }
  }, [settle])

  const step = useCallback((dir: 1 | -1) => goTo(indexRef.current + dir), [goTo])

  // Measure once and on resize only — never re-run per slide change.
  useLayoutEffect(() => {
    const measure = () => {
      slideW.current = viewportRef.current?.clientWidth ?? 0
      settle(indexRef.current, false)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [settle])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    suppressClick.current = false
    drag.current = { active: true, startX: e.clientX, delta: 0, pointerId: e.pointerId }
    // Capture keeps the drag alive if the pointer leaves the viewport. It throws
    // on an unrecognised pointerId, which must not take the drag down with it.
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* capture is optional */ }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.active) return
    const i = indexRef.current
    d.delta = e.clientX - d.startX
    // Resist dragging past the ends
    const atEdge = (i === 0 && d.delta > 0) || (i === offerings.length - 1 && d.delta < 0)
    const applied = atEdge ? d.delta * 0.32 : d.delta
    gsap.set(trackRef.current, { x: -i * slideW.current + applied })
  }

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    const el = e.currentTarget as HTMLElement
    try { if (el.hasPointerCapture?.(d.pointerId)) el.releasePointerCapture(d.pointerId) } catch { /* already released */ }
    const moved = d.delta
    d.delta = 0
    suppressClick.current = Math.abs(moved) > 6
    if (Math.abs(moved) > slideW.current * SWIPE_THRESHOLD) {
      step(moved < 0 ? 1 : -1)
    } else {
      settle(indexRef.current)
    }
  }

  // Guard against the track being left mid-drag if the pointer is lost
  useEffect(() => {
    const cancel = () => {
      if (drag.current.active) { drag.current.active = false; settle(indexRef.current) }
    }
    window.addEventListener('blur', cancel)
    return () => window.removeEventListener('blur', cancel)
  }, [settle])

  return (
    <section id="neivedhyam" className="section relative overflow-hidden" style={{ background: '#F4E6C8' }}>
      <div className="pattern-jali absolute inset-0" />

      <div className="shell-wide relative">

        <div className="grid12" style={{ alignItems: 'end', marginBottom: 'clamp(30px, 3.2vw, 48px)' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div className="eyebrow" data-anim="fade" style={{ marginBottom: 'var(--space-sm)' }}>
              <EyebrowStar />
              Neivedhyam Dishes &amp; Recipes
            </div>
            <h2 className="h2">
              <SplitLines lines={['Offerings That', <em className="serif-italic" style={{ color: '#8F1D25' }} key="n">Nourish the Divine</em>]} />
            </h2>
          </div>
          <div style={{ gridColumn: '9 / span 4' }}>
            <p className="body" data-anim="fade" data-delay="0.1">
              Neivedhyam — the sacred food offering — is an act of love and gratitude. Discover
              the traditional recipes that have graced India's festival tables for generations.
            </p>
          </div>
        </div>

        {/* ── Slider ── */}
        <div
          className="nv-slider"
          data-anim="fade"
          data-delay="0.14"
          role="group"
          aria-roledescription="carousel"
          aria-label="Neivedhyam offerings"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className="nv-viewport"
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={e => {
              if (!suppressClick.current) return
              suppressClick.current = false
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <div className="nv-track" ref={trackRef}>
              {offerings.map((o, i) => (
                <div
                  className="nv-slide"
                  key={o.name}
                  aria-hidden={i !== index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${offerings.length}: ${o.name}`}
                >
                  <div className="nv-grid">
                    <div className="nv-media">
                      {/* Position is already carried by the counter below;
                          a second numeral here was ornament. */}
                      <img
                        src={o.image}
                        /* One local plate per slide, at 1200×900 — the frame's
                           own 4:3. The slider frame is at most ~700px on a 1440
                           desktop and ~560 on a phone, so a single asset covers
                           every step at 2× with no upscale and there is no
                           `srcSet` to keep in sync with a remote crop pipeline. */
                        sizes="(max-width: 991.98px) 92vw, 46vw"
                        width={1200}
                        height={900}
                        alt={o.name}
                        /* Only the first slide is ever in view on load; the
                           other four are off-track and must not compete with
                           the hero for bandwidth. */
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    </div>

                    <div className="nv-copy">
                      <span className="micro t-gold" style={{ display: 'block', marginBottom: 18 }}>{o.type}</span>
                      <h3 className="h2" style={{ marginBottom: 20 }}>{o.name}</h3>
                      <p className="lead" style={{ marginBottom: 24, maxWidth: 440 }}>{o.desc}</p>
                      {/* Small supporting detail — how and when it is offered. */}
                      <p className="micro nv-note">{o.note}</p>
                      {/* The CTA that used to close this copy column has moved
                          into the control row below the track, where the brief
                          wants it grouped with the counter and the arrows. That
                          also collapses five identical buttons — one per slide,
                          four of them in an `aria-hidden` container needing
                          `tabIndex={-1}` — down to the single instance the
                          section always meant to have. */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Controls ──
              The CTA, the counter and the two arrows, in that order and nothing
              else — the pagination dots are gone by brief. The row spans the
              **copy column** and the three sit **together at its right edge**
              (2026-08-12, latest brief: the slide number and arrows align with
              the CTA), closing on the container's content rail.
              `.nv-controls` repeats `.nv-grid`'s own track definition and the
              group is placed in column 2, so the row spans exactly the rails
              `.nv-copy` spans at every width with no offset to keep in sync.
              Live region so the counter is announced as the track moves — the
              slides themselves are aria-hidden. */}
          <div className="nv-controls">
            <div className="nv-controls-group">
              <Button
                onClick={() => {
                  setPage('home')
                  setTimeout(() => scrollToSection('neivedhyam'), 260)
                }}
                /* Back to `line` (2026-08-12 brief: revert this CTA to its
                   previous style) after one session as a gold pill. A bare
                   label with a drawn-out underline has no horizontal padding,
                   which is also what lets it sit flush on the paragraph
                   column's left rail — see `.nv-controls-group`. No shine: the
                   shimmer is scoped to the filled pills. */
                variant="line"
                className="nv-cta"
              >
                Neivedhyam Dishes &amp; Recipes
              </Button>

              {/* Counter and arrows are one unit — they read as a pair and must
                  never be split across a wrapped line. Only the CTA is elastic. */}
              <div className="nv-controls-nav">
                <span className="micro nv-count" aria-live="polite" aria-atomic="true">
                  {String(index + 1).padStart(2, '0')} / {String(offerings.length).padStart(2, '0')}
                </span>

                  <div className="nv-arrows">
                    <button
                      className="nv-arrow"
                      onClick={() => step(-1)}
                      disabled={index === 0}
                      aria-label="Previous offering"
                    >
                      <svg width="22" height="9" viewBox="0 0 22 9" fill="none" aria-hidden="true" style={{ transform: 'rotate(180deg)' }}>
                        <path d="M0 4.5h20M16 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.7" />
                      </svg>
                    </button>
                    <button
                      className="nv-arrow"
                      onClick={() => step(1)}
                      disabled={index === offerings.length - 1}
                      aria-label="Next offering"
                    >
                      <svg width="22" height="9" viewBox="0 0 22 9" fill="none" aria-hidden="true">
                        <path d="M0 4.5h20M16 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.7" />
                      </svg>
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
