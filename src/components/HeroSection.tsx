import { useState, useEffect, useRef } from 'react'
import bannerImg from '@/imports/hero-banner.webp'
import { gsap, prefersReducedMotion } from '@/hooks/useReveal'

const slides = [
  { id: 1, lines: ['Light the Flame', 'of Devotion'] },
  { id: 2, lines: ['Let Every Breath', 'Be a Prayer'] },
  { id: 3, lines: ['Where Ritual Meets', 'Purity'] },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const rootRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Opening cinematic: image settles, then copy rises line by line.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' })
        .fromTo('.hero-line span', { yPercent: 108 }, { yPercent: 0, duration: 1.3, stagger: 0.11 }, 0.45)
        .fromTo('.hero-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.95)
        .fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.2)

      // Image drifts slower than the page for depth
      gsap.to(imageRef.current, {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.to(copyRef.current, {
        yPercent: -18, opacity: 0.15, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6800)
    return () => clearInterval(t)
  }, [])

  const goTo = (idx: number) => {
    if (idx === current) return
    if (prefersReducedMotion()) { setCurrent(idx); return }
    gsap.to('.hero-swap', {
      opacity: 0, y: -18, duration: 0.5, ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx)
        gsap.fromTo('.hero-swap', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' })
      },
    })
  }

  const s = slides[current]

  return (
    <section
      id="hero"
      ref={rootRef}
      className="hero-on-dark hero-shell relative w-full overflow-hidden"
      style={{ background: '#4A1A08' }}
    >
      {/* Full-bleed campaign image, held right so the copy column stays clear */}
      <div ref={imageRef} className="hero-media absolute inset-0" style={{ willChange: 'transform' }}>
        <img
          src={bannerImg}
          alt="Dheepam lamp oils and agarbatti arranged for puja"
          fetchPriority="high"
          decoding="async"
          /* Intrinsic size of the pre-framed plate (1900×1152, 1.649:1). The
             element is absolutely positioned and object-fit: cover, so these
             cannot shift layout — they just let the browser reserve the
             decode ahead of time. */
          width={1900}
          height={1152}
          className="w-full h-full"
        />
        {/* Readability wash — direction flips per breakpoint, see .hero-wash.
            No bottom fade: the banner runs edge to edge and meets the section
            below on a clean hard edge. */}
        <div className="hero-wash absolute inset-0" />
      </div>

      {/* Top pad clears the fixed bar off the shared `--nav-h` token rather than
          the old hard-coded 140, so it follows the bar down on tablet and phone
          instead of stranding the headline mid-frame. */}
      {/* `.shell-hero` is `.shell-wide` on the 1520px banner container — the one
          section that does not sit on the 1480 rails, per the brief. */}
      <div
        className="shell-wide shell-hero hero-frame hero-shell relative"
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'calc(var(--nav-h) + clamp(18px, 2vw, 28px))',
          paddingBottom: 'clamp(32px, 3.4vw, 48px)',
        }}
      >
        <div ref={copyRef} className="grid12 w-full">
          <div className="hero-copy" style={{ gridColumn: 'span 7' }}>

            <h1 className="h1 hero-swap hero-headline" style={{ marginBottom: 26 }}>
              {s.lines.map((line, i) => (
                <span className="hero-line line-mask" key={`${s.id}-${i}`}>
                  <span className="line-inner">
                    {i === 1 ? <em className="serif-italic hero-accent">{line}</em> : line}
                  </span>
                </span>
              ))}
            </h1>

            {/* 16px body, not the 20px lead — the banner carries no CTA now, so
                the description is the last block of copy and stays quiet. */}
            <p className="hero-sub body" style={{ maxWidth: 470 }}>
              A devotional lifestyle brand by Kaleesuwari — pure lamp oils and hand-rolled
              agarbatti, made for the rituals that hold a home together.
            </p>

            {/* Slide markers sit inside the copy column so they never sit over the
                product photography on the right. */}
            <div className="hero-meta hero-markers flex items-center" style={{ gap: 16, marginTop: 34 }}>
              {slides.map((sl, i) => (
                <button key={sl.id} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{ padding: '10px 0' }}>
                  <span
                    style={{
                      display: 'block', height: 2,
                      width: i === current ? 46 : 20,
                      background: i === current ? '#F5D161' : 'rgba(255,253,247,0.3)',
                      transition: 'width .7s var(--ease-out-soft), background .7s var(--ease-out-soft)',
                    }}
                  />
                </button>
              ))}
              <span className="micro" style={{ marginLeft: 6 }}>
                0{current + 1} / 0{slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
