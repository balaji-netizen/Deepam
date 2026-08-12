import { useState } from 'react'
import Button from '@/components/Button'
import PageHero from '@/components/PageHero'
import type { SetPage } from '@/types'

interface ContactPageProps {
  setPage: SetPage
}

const details = [
  { title: 'Kaleesuwari Refinery Pvt. Ltd.', desc: 'Manufacturers of Dheepam devotional products' },
  { title: 'Registered Office', desc: 'Chennai, Tamil Nadu, India' },
  { title: 'Online Purchases', desc: 'Visit kaleesuwari.com for our complete product range' },
  { title: 'Customer Care', desc: 'Reach us through the Kaleesuwari website for product queries' },
]

export default function ContactPage({ setPage }: ContactPageProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div style={{ background: '#FFFDF7' }}>
      <PageHero
        eyebrow="We Are Here"
        lines={['Contact', <em className="serif-italic" style={{ color: '#8F1D25' }} key="d">Dheepam</em>]}
        intro="Whether you have a question, feedback, or simply want to connect — we are here to help."
        image="https://images.unsplash.com/photo-1597393646842-4d899e15777e?w=1900&h=1000&fit=crop&auto=format"
        onBack={() => setPage('home')}
      />

      <div className="shell-wide" style={{ paddingBlock: 'clamp(72px, 8vw, 120px)' }}>
        <div className="grid12" style={{ rowGap: 64 }}>

          <div style={{ gridColumn: 'span 4' }}>
            <h2 className="h3" data-anim="fade" style={{ marginBottom: 40 }}>
              Let's Start a Conversation
            </h2>

            {details.map((item, i) => (
              <div key={item.title} data-anim="fade" data-delay={String(i * 0.06)} style={{ paddingBlock: 22, borderTop: '1px solid rgba(17,17,17,0.12)' }}>
                <p className="body-sm t-ink" style={{ fontWeight: 600, marginBottom: 5 }}>{item.title}</p>
                <p className="body-sm">{item.desc}</p>
              </div>
            ))}

            <div data-anim="fade" style={{ marginTop: 36, padding: '30px 32px', background: '#F8F0E3' }}>
              <p className="body" style={{ marginBottom: 20 }}>
                For purchases, bulk enquiries, and order tracking — visit the Kaleesuwari website.
              </p>
              <Button href="https://kaleesuwari.com" target="_blank" rel="noopener noreferrer" variant="line" icon={false}>
                Go to Kaleesuwari.com
              </Button>
            </div>
          </div>

          <div style={{ gridColumn: '6 / span 7' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} data-anim="fade" data-delay="0.1">
                <div className="grid12" style={{ rowGap: 30, marginBottom: 30 }}>
                  <div style={{ gridColumn: 'span 6' }}>
                    <label className="micro" style={{ display: 'block', marginBottom: 4 }}>
                      Your Name *
                    </label>
                    <input
                      type="text" required placeholder="Priya Krishnamurthy" className="field"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div style={{ gridColumn: '7 / span 6' }}>
                    <label className="micro" style={{ display: 'block', marginBottom: 4 }}>
                      Email Address *
                    </label>
                    <input
                      type="email" required placeholder="priya@email.com" className="field"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 30 }}>
                  <label className="micro" style={{ display: 'block', marginBottom: 4 }}>
                    Subject
                  </label>
                  <select className="field" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select a topic...</option>
                    <option>Product Enquiry — Lamp Oil</option>
                    <option>Product Enquiry — Agarbatti</option>
                    <option>Bulk / Wholesale Purchase</option>
                    <option>Ritual &amp; Traditions Question</option>
                    <option>Feedback &amp; Suggestions</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: 44 }}>
                  <label className="micro" style={{ display: 'block', marginBottom: 4 }}>
                    Message *
                  </label>
                  <textarea
                    required rows={5} placeholder="Tell us how we can help you..." className="field"
                    style={{ resize: 'none' }}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="solid" magnetic>Send Message</Button>
              </form>
            ) : (
              <div data-anim="fade" style={{ padding: 'clamp(36px, 5vw, 72px)', background: '#F8F0E3' }}>
                <span className="num-marker" style={{ display: 'block', marginBottom: 18 }}>✦</span>
                <h3 className="h3" style={{ marginBottom: 20 }}>
                  Thank You, {form.name.split(' ')[0]}
                </h3>
                <p className="body" style={{ marginBottom: 36, maxWidth: 460 }}>
                  Your message has been received. We'll get back to you shortly.
                  May your devotion always shine bright.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="line" icon={false}>Send Another Message</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
