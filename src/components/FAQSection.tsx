import { useState } from 'react'
import EyebrowStar from '@/components/EyebrowStar'
import SplitLines from '@/components/SplitLines'

const faqCategories = [
  {
    label: 'Lamp Oil',
    questions: [
      { q: 'Which oil is best for daily puja lamps?', a: 'Sesame oil (gingelly/nalla ennai) is considered the most auspicious for daily puja. Coconut oil is a popular alternative in many South Indian households. Dheepam offers pure, unadulterated versions of both.' },
      { q: 'Can I mix different oils in a diya?', a: 'It is not recommended to mix oils, as each oil has its own spiritual and physical burning properties. Use one pure oil at a time for best results and ritual purity.' },
      { q: 'How long does Dheepam Lamp Oil last?', a: 'Dheepam Lamp Oil has a shelf life of 12–18 months when stored in a cool, dry place away from direct sunlight. Ensure the container is tightly sealed after use.' },
      { q: 'Is Dheepam Lamp Oil safe for use indoors?', a: 'Yes. Dheepam oils are refined to burn cleanly with minimal smoke, making them ideal for indoor use in puja rooms and home shrines.' },
    ],
  },
  {
    label: 'Agarbatti',
    questions: [
      { q: 'What makes Dheepam Agarbatti different?', a: 'Dheepam Agarbattis are made using natural resins, herbs, and aromatic woods — not synthetic fragrances. This ensures a purer, longer-lasting scent and a calmer burn that respects the sanctity of puja.' },
      { q: 'How many agarbattis should I light during puja?', a: 'Traditionally, odd numbers (1, 3, or 5) are considered auspicious. However, the number can vary by regional tradition and deity. One agarbatti lit with full devotion is always sufficient.' },
      { q: 'How should I store agarbatti?', a: 'Store agarbattis in a cool, dry place, ideally in their original packaging. Avoid humidity and direct sunlight, as these can affect the fragrance and burn quality.' },
      { q: 'Are Dheepam Agarbattis suitable for sensitive individuals?', a: 'Our agarbattis use natural ingredients, but those with severe respiratory sensitivities should ensure adequate ventilation. We recommend our low-smoke variants for enclosed spaces.' },
    ],
  },
  {
    label: 'Rituals',
    questions: [
      { q: 'Which direction should a lamp face during puja?', a: 'Traditionally, the lamp flame should face east or northeast during morning prayers. In the evening, facing north (towards the deity) is considered most auspicious.' },
      { q: 'Can I light a lamp every day?', a: 'Absolutely — and it is highly encouraged. Daily lamp lighting (especially at dawn and dusk) is one of the simplest, most powerful devotional practices. Consistency is more important than occasion.' },
      { q: 'What are the auspicious days for lamp lighting?', a: 'While every day is auspicious for devotion, Fridays, Karthigai Dheepam, Diwali, Pournami (full moon), and Pradosham evenings are considered especially powerful for lamp lighting rituals.' },
      { q: 'Should I always use a brass or clay diya?', a: 'Both are traditional. Clay (terracotta) diyas are preferred for Diwali and temple offerings. Brass and bronze are used for daily puja as they are durable and considered ritually pure metals.' },
    ],
  },
  {
    label: 'Purchase',
    questions: [
      { q: 'Where can I buy Dheepam products?', a: 'Dheepam products are available on the Kaleesuwari website (kaleesuwari.com) and through major retail stores across South India. Visit the website for online purchase and home delivery.' },
      { q: 'Are Dheepam products available outside India?', a: 'Currently, Dheepam products are primarily available within India. For international availability, please check the Kaleesuwari website or contact their customer support directly.' },
      { q: 'How can I use my quiz coupon code?', a: 'Your coupon code can be entered at checkout on the Kaleesuwari website. The discount is applied automatically. Coupons are valid for first-time orders with 30-day validity from the date of issue.' },
      { q: 'Is there a bulk or wholesale option for temples?', a: 'Yes, Kaleesuwari offers institutional and bulk purchasing options for temples and religious organisations. Please reach out to their sales team through the website for special pricing.' },
    ],
  },
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="section relative" style={{ background: '#FFFDF7' }}>
      <div className="pattern-jali absolute inset-0" />

      <div className="shell-wide relative">
        <div className="grid12" style={{ rowGap: 'var(--space-content)' }}>

          <div style={{ gridColumn: 'span 4' }}>
            <div className="eyebrow" data-anim="fade" style={{ marginBottom: 'var(--space-sm)' }}>
              <EyebrowStar />
              Questions
            </div>
            <h2 className="h2" style={{ marginBottom: 30 }}>
              <SplitLines lines={['Frequently Asked', <em className="serif-italic" style={{ color: '#8F1D25' }} key="a">Questions</em>]} />
            </h2>

            <div className="flex flex-col" style={{ gap: 2 }} data-anim="fade" data-delay="0.12">
              {faqCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCategory(i); setOpenIdx(0) }}
                  className="micro faq-cat text-left"
                  aria-pressed={activeCategory === i}
                  style={{ color: activeCategory === i ? '#8F1D25' : 'rgba(17,17,17,0.4)' }}
                >
                  {/* These are subject filters, not steps — numbering them would
                      imply an order the reader does not need. Selection is shown
                      by a gold rule instead. */}
                  <span className="faq-cat-rule" aria-hidden="true" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ gridColumn: '6 / span 7' }}>
            {faqCategories[activeCategory].questions.map((item, i) => {
              const isOpen = openIdx === i
              return (
                <div key={item.q} style={{ borderTop: '1px solid rgba(17,17,17,0.12)' }}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full text-left flex items-start justify-between"
                    style={{ gap: 28, paddingBlock: 21 }}
                    aria-expanded={isOpen}
                  >
                    <span className="h3" style={{ fontSize: 'clamp(17px, 1.35vw, 22px)', fontFamily: 'var(--font-sans)', fontWeight: 500, lineHeight: 1.45 }}>
                      {item.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0, width: 15, height: 15, position: 'relative', marginTop: 6,
                        transform: isOpen ? 'rotate(135deg)' : 'none',
                        transition: 'transform .55s var(--ease-out-soft)',
                      }}
                      aria-hidden="true"
                    >
                      <span style={{ position: 'absolute', top: 7, left: 0, width: 15, height: 1, background: '#111' }} />
                      <span style={{ position: 'absolute', left: 7, top: 0, height: 15, width: 1, background: '#111' }} />
                    </span>
                  </button>
                  <div className={`accordion-panel ${isOpen ? 'open' : ''}`}>
                    <div>
                      <p className="body" style={{ paddingBottom: 24, maxWidth: 620 }}>{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            <div style={{ borderTop: '1px solid rgba(17,17,17,0.12)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
