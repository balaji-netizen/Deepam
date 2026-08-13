import Button from '@/components/Button'
import SplitLines from '@/components/SplitLines'
import PageHero from '@/components/PageHero'
import type { SetPage } from '@/types'

interface LampLightingPageProps {
  setPage: SetPage
}

const sections = [
  {
    id: 'why',
    title: 'Why We Light Lamps',
    subtitle: 'The Flame Within',
    image: 'https://images.unsplash.com/photo-1775427528127-a66ce3bb2bcb?w=1000&h=1250&fit=crop&auto=format',
    paras: [
      "The act of lighting a lamp is one of humanity's oldest rituals — predating formal religion, spanning continents, and crossing civilisations. In the Indian tradition, the lamp is not merely a source of light. It is a living symbol of divine consciousness.",
      "The Sanskrit word 'Dheepam' comes from 'Deepa' — meaning light, clarity, and radiance. When we light a lamp in our home or temple, we are invoking that same radiance. We are saying, without words: 'Let the divine presence fill this space.'",
      'The flame represents Jnana — knowledge that dispels the darkness of ignorance. Every time we light a lamp before prayer, we are making a spiritual statement: that we seek clarity, wisdom, and the presence of the sacred in our daily lives.',
    ],
    quote: '"Tamaso ma jyotir gamaya" — Lead us from darkness to light.',
    quoteSource: 'Brihadaranyaka Upanishad',
  },
  {
    id: 'benefits',
    title: 'Benefits of Lamp Lighting',
    subtitle: 'Science Meets Spirituality',
    image: 'https://images.unsplash.com/photo-1597393646842-4d899e15777e?w=1000&h=1250&fit=crop&auto=format',
    paras: [
      'The benefits of lamp lighting are both spiritual and scientific. Modern research has confirmed what our ancestors knew intuitively: the burning of sesame oil releases compounds that purify the air, reduce harmful bacteria, and create a calming atmosphere.',
      'On the spiritual level, the act of lighting a lamp at dawn and dusk creates a rhythm — a sacred structure to the day. Morning lamp lighting sets an intention of clarity and purpose. Evening lamp lighting marks the transition into the inner world of prayer and rest.',
      "Regular lamp lighting has also been shown to have meditative benefits. The act of focusing on a single flame calms the nervous system, reduces cortisol, and invites the mind into a state of quiet presence — what ancient texts call 'Dharana'.",
    ],
    highlights: [
      { title: 'Purifies Air', desc: 'Sesame oil burning releases antimicrobial compounds' },
      { title: 'Calms Mind', desc: 'Flame gazing (Trataka) reduces stress and anxiety' },
      { title: 'Positive Energy', desc: 'Creates Satvik (pure) vibrations in the home' },
      { title: 'Sacred Space', desc: 'Transforms any room into a place of worship' },
    ],
  },
  {
    id: 'auspicious',
    title: 'Auspicious Days for Lamp Lighting',
    subtitle: 'The Devotional Calendar',
    image: 'https://images.unsplash.com/photo-1702505433756-88130191bb4b?w=1000&h=1250&fit=crop&auto=format',
    paras: ['While every day is auspicious for lighting a lamp in devotion, certain days carry a heightened spiritual charge — days when the cosmic energies align to amplify our prayers and intentions.'],
    calendar: [
      { day: 'Daily', occasion: 'Dawn & Dusk Lamp', note: 'Sandhi time — the meeting of day and night — is the most powerful time for prayer.' },
      { day: 'Friday', occasion: 'Shukravar Dheepam', note: 'Sacred to Goddess Lakshmi; sesame oil lamps invite prosperity and grace.' },
      { day: 'Pournami (Full Moon)', occasion: 'Pournami Dheepam', note: 'The full moon amplifies all spiritual practices a hundredfold.' },
      { day: 'Pradosham (Bi-monthly)', occasion: 'Shiva Dheepam', note: 'The auspicious twilight window for Shiva worship — sesame oil lamps especially powerful.' },
      { day: 'Karthigai Month', occasion: 'Karthigai Dheepam', note: 'Thousands of diyas illuminate every home and temple across Tamil Nadu.' },
      { day: 'Diwali', occasion: 'Amavasai Dheepam', note: 'New moon night — the darkest night, made radiant by millions of lamps.' },
      { day: 'Aadi Month', occasion: 'Aadi Velli', note: 'Friday in Aadi — especially powerful for Goddess Shakti worship.' },
      { day: 'Thai Pongal', occasion: 'Harvest Dheepam', note: 'Lamps lit to honour the sun and the bounty of the earth.' },
    ],
  },
  {
    id: 'practices',
    title: 'Traditional Practices',
    subtitle: 'The Art of the Sacred Flame',
    image: 'https://images.unsplash.com/photo-1701093919822-899072e02c41?w=1000&h=1250&fit=crop&auto=format',
    paras: ['The lamp lighting ritual is not merely the act of striking a match. It is a carefully considered practice with rules of direction, oil, wick, vessel, and intention — each element carrying deep symbolic meaning.'],
    practices: [
      { title: 'The Direction', rule: 'Face east or north-east for morning; north for evening lamp', why: 'East — direction of the rising sun. North — direction of the Pole Star, eternal and unchanging.' },
      { title: 'The Oil', rule: 'Sesame oil for daily use; ghee for festivals and special occasions', why: 'Sesame (gingelly) oil is "Nalla Ennai" (good oil) — considered the most spiritually pure for lamp lighting.' },
      { title: 'The Wick', rule: 'Cotton wicks are traditional; odd numbers are auspicious', why: 'A single wick for daily puja; five wicks (Pancha Dheepam) for major pujas representing the five elements.' },
      { title: 'The Vessel', rule: 'Brass for daily use; clay for Diwali; silver for major festivals', why: 'Brass is a satvik metal — it does not react with the oil and maintains ritual purity over years of use.' },
      { title: 'Extinguishing', rule: 'Never blow out the flame with your mouth', why: 'Breath is considered impure for the sacred flame. Use your hand or a lamp snuffer instead.' },
      { title: 'After Lighting', rule: 'Sit in silence for at least 3 minutes after lighting the lamp', why: 'The moments after lighting are for prayer, gratitude, and setting your intention for the day or evening.' },
    ],
  },
]

export default function LampLightingPage({ setPage }: LampLightingPageProps) {
  return (
    <div style={{ background: '#FFFDF7' }}>
      <PageHero
        eyebrow="The Complete Guide"
        lines={['The Sacred Art of', <em className="serif-italic" style={{ color: '#8F1D25' }} key="l">Lamp Lighting</em>]}
        intro="From the spiritual significance to the precise ritual — your complete guide to one of India's most ancient devotional practices."
        image="https://images.unsplash.com/photo-1597393646842-4d899e15777e?w=1900&h=1000&fit=crop&auto=format"
        onBack={() => setPage('home')}
      />

      <div className="shell-wide" style={{ paddingBlock: 'clamp(72px, 8vw, 120px)' }}>
        {sections.map((section, si) => {
          const flip = si % 2 === 1
          return (
            <section
              key={section.id}
              id={section.id}
              style={{ marginBottom: 'clamp(90px, 11vw, 180px)' }}
            >
              <div className="grid12" style={{ rowGap: 44, alignItems: 'start' }}>

                <div style={{ gridColumn: flip ? '7 / span 6' : 'span 6', order: flip ? 2 : 1 }}>
                  <div className="img-frame img-warm" data-anim="mask" style={{ aspectRatio: '4 / 5', position: 'sticky', top: 110 }}>
                    <img src={section.image} alt={section.title} loading="lazy" />
                  </div>
                </div>

                <div style={{ gridColumn: flip ? '1 / span 5' : '8 / span 5', order: flip ? 1 : 2 }}>
                  <span className="num-marker" style={{ display: 'block', marginBottom: 14 }}>0{si + 1}</span>
                  <div className="eyebrow" data-anim="fade" style={{ marginBottom: 22 }}>{section.subtitle}</div>
                  <h2 className="h2" style={{ marginBottom: 32, fontSize: 'clamp(28px, 3.2vw, 46px)' }}>
                    <SplitLines lines={[section.title]} />
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                    {section.paras.map((p, i) => (
                      <p key={i} className="body" data-anim="fade" data-delay={String(i * 0.06)}>{p}</p>
                    ))}
                  </div>

                  {'quote' in section && (
                    <blockquote data-anim="fade" style={{ borderLeft: '1px solid #C9A227', paddingLeft: 24, marginTop: 38 }}>
                      <p className="h3" style={{ fontStyle: 'italic', marginBottom: 12 }}>{section.quote}</p>
                      <cite className="micro" style={{ fontStyle: 'normal' }}>
                        — {section.quoteSource}
                      </cite>
                    </blockquote>
                  )}

                  {'highlights' in section && (
                    <div style={{ marginTop: 38 }}>
                      {section.highlights!.map((h, i) => (
                        <div key={h.title} data-anim="fade" data-delay={String(i * 0.06)} style={{ paddingBlock: 20, borderTop: '1px solid rgba(17,17,17,0.12)' }}>
                          <p className="body-sm t-ink" style={{ fontWeight: 600, marginBottom: 5 }}>{h.title}</p>
                          <p className="body-sm">{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {'calendar' in section && (
                    <div style={{ marginTop: 38 }}>
                      {section.calendar!.map((c, i) => (
                        <div key={c.day} data-anim="fade" data-delay={String(i * 0.04)} style={{ paddingBlock: 20, borderTop: '1px solid rgba(17,17,17,0.12)' }}>
                          <div className="flex flex-wrap items-baseline" style={{ gap: 10, marginBottom: 5 }}>
                            <span className="body-sm t-ink" style={{ fontWeight: 600 }}>{c.day}</span>
                            <span className="body-sm t-gold" style={{ fontSize: 12 }}>— {c.occasion}</span>
                          </div>
                          <p className="body-sm">{c.note}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {'practices' in section && (
                    <div style={{ marginTop: 38 }}>
                      {section.practices!.map((p, i) => (
                        <div key={p.title} data-anim="fade" data-delay={String(i * 0.05)} style={{ paddingBlock: 24, borderTop: '1px solid rgba(17,17,17,0.12)' }}>
                          <p className="micro t-gold" style={{ marginBottom: 8 }}>{p.title}</p>
                          <p className="body" style={{ color: '#111111', marginBottom: 8 }}>{p.rule}</p>
                          <p className="body-sm">{p.why}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })}

        <div className="rule-kolam" style={{ marginBottom: 48 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" opacity="0.7" />
          </svg>
        </div>

        <div className="text-center" data-anim="fade">
          <h2 className="h2" style={{ marginBottom: 34 }}>Ready to light your lamp with Dheepam?</h2>
          <div className="flex flex-wrap justify-center" style={{ gap: 16 }}>
            <Button href="https://kaleesuwari.com" target="_blank" rel="noopener noreferrer" variant="gold" magnetic>
              Shop Dheepam Lamp Oil
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
