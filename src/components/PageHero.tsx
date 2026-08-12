import type { ReactNode } from 'react'
import SplitLines from '@/components/SplitLines'

interface PageHeroProps {
  eyebrow: string
  lines: ReactNode[]
  intro: string
  image: string
  onBack: () => void
}

/** Shared light editorial hero for the three sub-pages. */
export default function PageHero({ eyebrow, lines, intro, image, onBack }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden" style={{ background: '#FFFDF7', paddingTop: 172 }}>
      {/* One decorative layer per section */}
      <div className="pattern-kolam absolute inset-0" />

      <div className="shell-wide relative">
        <button onClick={onBack} className="cta cta-line" style={{ marginBottom: 46 }}>
          <svg className="cta-arrow" width="20" height="8" viewBox="0 0 20 8" fill="none" style={{ transform: 'rotate(180deg)' }} aria-hidden="true">
            <path d="M0 4h18M14.5 0.5L18.5 4l-4 3.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span>Back to Home</span>
        </button>

        <div className="grid12" style={{ alignItems: 'end', rowGap: 30 }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div className="eyebrow" style={{ marginBottom: 30 }}>{eyebrow}</div>
            <h1 className="h1"><SplitLines lines={lines} /></h1>
          </div>
          <div style={{ gridColumn: '9 / span 4' }}>
            <p className="lead">{intro}</p>
          </div>
        </div>
      </div>

      <div className="shell-bleed" style={{ marginTop: 'clamp(52px, 6vw, 84px)' }}>
        <div className="img-frame img-warm" data-anim="mask" style={{ height: 'clamp(280px, 38vw, 520px)' }}>
          <img src={image} alt="" aria-hidden="true" loading="lazy" />
        </div>
      </div>
    </header>
  )
}
