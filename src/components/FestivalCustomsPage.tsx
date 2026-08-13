import { useState } from 'react'
import Button from '@/components/Button'
import PageHero from '@/components/PageHero'
import { useReveal } from '@/hooks/useReveal'
import type { SetPage } from '@/types'

interface FestivalCustomsPageProps {
  setPage: SetPage
}

const customs = [
  {
    festival: 'Karthigai Dheepam',
    period: 'November – December',
    image: 'https://images.unsplash.com/photo-1775427528127-a66ce3bb2bcb?w=1000&h=1250&fit=crop&auto=format',
    overview: 'Karthigai Dheepam is the festival of light celebrated in the Tamil month of Karthigai. It is one of the most ancient festivals in South India, dedicated to Lord Murugan and the divine flame of Lord Shiva atop Thiruvannamalai hill.',
    rituals: [
      { name: 'Deepa Pradhakshina', desc: 'Walking around a lit lamp three times clockwise, symbolising the circumambulation of the divine light.' },
      { name: 'Home Lamp Lighting', desc: 'Households light small clay diyas all around their homes — doorways, windows, terraces — to guide the divine into every corner.' },
      { name: 'Pattalam (Fireworks)', desc: 'The evening sky is lit with fireworks, accompanying the lighting of the great beacon at Thiruvannamalai.' },
    ],
    neivedhyam: ['Thiruvannamalai Sweet Pongal', 'Nei Payasam', 'Kozhukattai', 'Akkaravadisal'],
    oilNote: 'Sesame oil diyas — Dheepam Pure Sesame Oil for maximum auspiciousness.',
    significance: 'The Beacon (Bharani Dheepam) lit atop Arunachala hill at Thiruvannamalai is believed to be Shiva himself in the form of light — and every lamp lit on this day partakes of that divine radiance.',
  },
  {
    festival: 'Navaratri',
    period: 'September – October',
    image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?w=1000&h=1250&fit=crop&auto=format',
    overview: "Navaratri — 'Nine Nights' — celebrates the Goddess (Devi) in her three forms: Durga (power), Lakshmi (prosperity), and Saraswati (wisdom). Marked by Kolu displays, community singing, and daily offerings.",
    rituals: [
      { name: 'Kolu Display', desc: 'A tiered display of dolls (bommai kolu) on odd-numbered steps, representing all of creation from the divine to the earthly.' },
      { name: 'Agarbatti Offerings', desc: 'Nine different fragrances of agarbatti are offered to the Goddess — one for each night and her nine forms (Navadurga).' },
      { name: 'Sundal Distribution', desc: 'Boiled legumes offered to the Goddess and distributed to neighbours — a ritual of community and sharing.' },
    ],
    neivedhyam: ['Sundal (9 varieties)', 'Panakam', 'Arisi Upma', 'Sweet Pongal', 'Modak'],
    oilNote: 'Coconut oil lamps for Lakshmi puja nights; sesame oil for Durga nights.',
    significance: "Each night of Navaratri corresponds to a different Shakti — and the agarbatti and lamp offered on each night aligns with that form's unique spiritual energy.",
  },
  {
    festival: 'Diwali',
    period: 'October – November',
    image: 'https://images.unsplash.com/photo-1702505433756-88130191bb4b?w=1000&h=1250&fit=crop&auto=format',
    overview: 'Diwali — the Festival of Lights — celebrates the return of Lord Rama to Ayodhya after 14 years of exile, and in South India, the day Krishna slew the demon Narakasura. A time of light, sweets, and renewal.',
    rituals: [
      { name: 'Naraka Chaturdashi', desc: 'The day before Diwali: an oil bath at dawn (abhyanga snanam) to purify the body and welcome the festival.' },
      { name: 'Lakshmi Puja', desc: 'On Amavasya (new moon), Lakshmi is worshipped with ghee lamps, flowers, and sweets to invite prosperity.' },
      { name: 'Rangoli & Lamp Lighting', desc: 'Elaborate rangoli designs are drawn at the entrance, and rows of diyas light pathways to the home.' },
    ],
    neivedhyam: ['Murukku', 'Adhirasam', 'Besan Ladoo', 'Mysore Pak', 'Chakli', 'Thenkuzhal'],
    oilNote: 'Sesame oil for Lakshmi puja; ghee for the main puja lamp.',
    significance: 'The new moon (amavasya) of Diwali is the darkest night of the year — making every lamp lit even more powerful as an act of faith against darkness.',
  },
  {
    festival: 'Thai Pongal',
    period: 'January',
    image: 'https://images.unsplash.com/photo-1641296834408-b09a187937d5?w=1000&h=1250&fit=crop&auto=format',
    overview: 'Thai Pongal is the Tamil harvest festival — a celebration of gratitude to the Sun, the Earth, the cattle, and the community that together made the harvest possible.',
    rituals: [
      { name: 'Pongal Cooking', desc: 'Rice cooked in a new clay pot until it overflows — the overflow symbolises abundance and prosperity.' },
      { name: 'Surya Namaskar', desc: 'Prayers and lamp offerings to the Sun god at sunrise — facing east, the direction of the rising sun.' },
      { name: 'Kolam Drawing', desc: 'Elaborate rice-flour kolam patterns drawn at the entrance to invite Lakshmi and ward off negative energies.' },
    ],
    neivedhyam: ['Sweet Pongal', 'Venn Pongal', 'Sugarcane', 'Banana', 'Rice Vadai'],
    oilNote: "Sesame oil — as Pongal falls in winter, sesame oil's warmth is especially appropriate.",
    significance: 'Pongal is a philosophical statement: that abundance comes from gratitude, and that the flame of devotion, like the harvest, must be tended daily.',
  },
]

export default function FestivalCustomsPage({ setPage }: FestivalCustomsPageProps) {
  const [active, setActive] = useState(0)
  const current = customs[active]

  useReveal([active])

  return (
    <div style={{ background: '#FFFDF7' }}>
      <PageHero
        eyebrow="Festival Guide"
        lines={['Festivals &', <em className="serif-italic" style={{ color: '#8F1D25' }} key="c">Sacred Customs</em>]}
        intro="Explore the rituals, neivedhyam, and devotional traditions of India's most beloved festivals."
        image="https://images.unsplash.com/photo-1635424785729-c022fc1a61bd?w=1900&h=1000&fit=crop&auto=format"
        onBack={() => setPage('home')}
      />

      {/* Sticky festival switcher */}
      <div
        className="sticky z-30"
        style={{ top: 92, background: 'rgba(255,253,247,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(17,17,17,0.08)' }}
      >
        <div className="shell-wide" style={{ overflowX: 'auto' }}>
          <div className="flex" style={{ gap: 34, minWidth: 'max-content' }}>
            {customs.map((c, i) => (
              <button
                key={c.festival}
                onClick={() => setActive(i)}
                style={{
                  paddingBlock: 20,
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  color: active === i ? '#111111' : 'rgba(17,17,17,0.4)',
                  borderBottom: active === i ? '1px solid #8F1D25' : '1px solid transparent',
                  marginBottom: -1,
                  transition: 'color .4s var(--ease-out-soft), border-color .4s var(--ease-out-soft)',
                }}
              >
                {c.festival}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={active} className="shell-wide" style={{ paddingBlock: 'clamp(64px, 7vw, 104px)' }}>

        <div className="grid12" style={{ rowGap: 48, marginBottom: 'clamp(64px, 7vw, 100px)' }}>
          <div style={{ gridColumn: 'span 5' }}>
            <div className="img-frame img-warm" data-anim="mask" style={{ aspectRatio: '4 / 5' }}>
              <img src={current.image} alt={current.festival} loading="lazy" />
            </div>
          </div>
          <div style={{ gridColumn: '7 / span 6' }}>
            <div className="eyebrow" data-anim="fade" style={{ marginBottom: 24 }}>{current.period}</div>
            <h2 className="h2" data-anim="fade" data-delay="0.06" style={{ marginBottom: 28 }}>{current.festival}</h2>
            <p className="lead" data-anim="fade" data-delay="0.1">{current.overview}</p>

            <div data-anim="fade" data-delay="0.16" style={{ marginTop: 40, paddingLeft: 24, borderLeft: '1px solid #C9A227' }}>
              <p className="micro" style={{ marginBottom: 12 }}>Significance</p>
              <p className="h3" style={{ fontStyle: 'italic', fontSize: 'clamp(18px, 1.5vw, 24px)' }}>"{current.significance}"</p>
            </div>
          </div>
        </div>

        <div className="grid12" style={{ rowGap: 56 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <h3 className="h3" style={{ marginBottom: 30 }}>Sacred Rituals</h3>
            {current.rituals.map((r, i) => (
              <div key={r.name} data-anim="fade" data-delay={String(i * 0.07)} style={{ paddingBlock: 24, borderTop: '1px solid rgba(17,17,17,0.12)' }}>
                <div className="flex" style={{ gap: 20 }}>
                  <span className="micro t-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="body-sm t-ink" style={{ fontWeight: 600, marginBottom: 6 }}>{r.name}</p>
                    <p className="body-sm">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Anchor target for the homepage Neivedhyam CTA and the
              "Neivedhyam Dishes & Recipes" nav item. */}
          <div id="neivedhyam-dishes" style={{ gridColumn: '8 / span 5', scrollMarginTop: 120 }}>
            <h3 className="h3" style={{ marginBottom: 30 }}>Neivedhyam Dishes</h3>
            <div className="flex flex-wrap" data-anim="fade" style={{ gap: 10, marginBottom: 48 }}>
              {current.neivedhyam.map(dish => (
                <span
                  key={dish}
                  className="body-sm"
                  style={{ padding: '9px 16px', background: '#F4E6C8', color: '#111111', fontSize: 12.5 }}
                >
                  {dish}
                </span>
              ))}
            </div>

            <div data-anim="fade" data-delay="0.08" style={{ padding: '30px 32px', background: '#F8F0E3' }}>
              <p className="micro t-gold" style={{ marginBottom: 12 }}>
                Recommended Dheepam Lamp Oil
              </p>
              <p className="body" style={{ marginBottom: 20 }}>{current.oilNote}</p>
              <Button href="https://kaleesuwari.com" target="_blank" rel="noopener noreferrer" variant="line" icon={false}>
                Shop Dheepam Oils
              </Button>
            </div>
          </div>
        </div>

        <div className="rule-kolam" style={{ marginBlock: 'clamp(64px, 7vw, 100px)' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" opacity="0.7" />
          </svg>
        </div>

        <div className="text-center" data-anim="fade">
          <div className="flex flex-wrap justify-center" style={{ gap: 16 }}>
            <Button href="https://kaleesuwari.com" target="_blank" rel="noopener noreferrer" variant="gold" magnetic>
              Shop Festival Essentials
            </Button>
            <Button onClick={() => setPage('home')} variant="outline" iconDirection="left">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
