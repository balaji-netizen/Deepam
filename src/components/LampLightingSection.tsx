import { useRef, useState } from 'react'
import Button02 from '@/components/shadcn-space/button/button-02'
import EyebrowStar from '@/components/EyebrowStar'
import SplitLines from '@/components/SplitLines'
import guideVideo from '@/imports/lamp-lighting-guide.mp4'
import { prefersReducedMotion } from '@/hooks/useReveal'
import type { SetPage } from '@/types'

interface LampLightingSectionProps {
  setPage: SetPage
}

/**
 * Split editorial, per the design comp: copy on the left rail, a 4:5 portrait
 * plate on columns 8–12. Previously this was a centred "manifesto" column
 * followed by a full-bleed horizon band — two stacked blocks where the comp
 * resolves the whole section in one row.
 */
export default function LampLightingSection({ setPage }: LampLightingSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  /* Autoplaying video is motion like any other, so it does not start under
     `prefers-reduced-motion` — the clip sits on its poster frame and the corner
     chip becomes a play button. Read once at mount, the same way `useReveal`
     reads it. */
  const [reduced] = useState(prefersReducedMotion)
  /* Optimistic otherwise: the clip carries `autoPlay muted loop`, so it is
     playing by the time anyone can reach the control. If a browser refuses the
     autoplay the first press still does the right thing — it calls `play()` on
     an element that is paused — and the `onPlay`/`onPause` handlers below keep
     the label honest either way. */
  const [playing, setPlaying] = useState(!reduced)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => { /* autoplay policy — leave it paused */ })
    else v.pause()
  }

  return (
    <section id="lamp-lighting" className="section relative overflow-hidden" style={{ background: '#FFFDF7' }}>
      {/* One decorative layer per section — a slow-turning mandala is this one's */}
      <div
        className="mandala-faint mandala-spin position-absolute d-none d-xl-block"
        style={{ width: 720, height: 720, left: '-280px', top: '4%', opacity: 0.32, pointerEvents: 'none' }}
      />

      <div className="shell-wide relative">
        <div className="grid12" style={{ rowGap: 'var(--space-content)', alignItems: 'center' }}>

          <div className="ll-copy" style={{ gridColumn: '1 / span 6' }}>
            <div className="eyebrow" data-anim="fade">
              <EyebrowStar />
              Lamp Lighting Guide
            </div>

            <h2 className="h2 ll-head">
              <SplitLines lines={['The Sacred Art', <em className="serif-italic" style={{ color: '#8F1D25' }} key="d">of the Dheepam</em>]} />
            </h2>

            <p className="lead ll-lead" data-anim="fade" data-delay="0.1">
              In every lamp lit at dawn, in every flame that flickers through the evening
              prayer, lives a tradition as ancient as civilisation itself.
            </p>

            {/* What the guide covers — the comp carries this as the supporting
                paragraph under the lead, where it used to sit as a caption
                beneath the image band. */}
            <p className="body ll-note" data-anim="fade" data-delay="0.14">
              Why we light lamps · Benefits · Auspicious days · Traditional practices
            </p>

            {/* Static by brief. The `magnetic` prop is gone — it wrapped the
                button in `<span class="magnetic">` for the cursor-attraction
                tween in useReveal.ts, which is movement. The `data-anim="fade"`
                on the wrapper stays: it is a scroll reveal, not motion on the
                button, and the hover/focus fill comes from `.cta` untouched.
                Same decision as the closing CTA. */}
            <div data-anim="fade" data-delay="0.18">
              {/* The shiny CTA (2026-08-13): same gold pill, same 44px box,
                  same 14px Figtree label — `Button02` only adds `.btn-02`,
                  which swaps the once-per-hover highlight for the ambient
                  left→right reflection. Still no `magnetic`. */}
              <Button02 onClick={() => setPage('home')}>
                Explore the Lamp Lighting Guide
              </Button02>
            </div>
          </div>

          <div style={{ gridColumn: '8 / span 5' }}>
            {/* The plate is the supplied `Lamp Lighting Guide` clip (2026-08-12),
                not a photograph. It is authored at 550×690 — the frame's own 4:5
                — so the section's layout, rails and reveal are untouched; only
                what fills the frame changed. Muted and looping, which is what
                lets it autoplay at all, and `playsInline` so iOS does not take
                it fullscreen. */}
            <div className="img-frame img-warm ll-media ll-video" data-anim="mask">
              <video
                ref={videoRef}
                src={guideVideo}
                width={550}
                height={690}
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Lighting the Dheepam lamp"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                /* If a browser refuses the muted autoplay, no `pause` event ever
                   fires — the clip simply never starts — and the chip would sit
                   there showing a pause glyph for a video that is not running.
                   One sync once the data is in settles it either way. */
                onLoadedData={e => setPlaying(!e.currentTarget.paused)}
              />
              {/* The clip runs 10s on a loop, so WCAG 2.2.2 needs a way to stop
                  it. One gold chip in the corner rather than the native control
                  bar, which would put browser chrome across a portrait plate. */}
              <button
                type="button"
                className="ll-video-toggle"
                onClick={toggle}
                aria-label={playing ? 'Pause the lamp lighting video' : 'Play the lamp lighting video'}
              >
                {playing ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="0" width="3.2" height="12" />
                    <rect x="6.8" y="0" width="3.2" height="12" />
                  </svg>
                ) : (
                  <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden="true">
                    <path d="M0 0l11 6-11 6z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
