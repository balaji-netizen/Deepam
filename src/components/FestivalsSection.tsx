import Button02 from '@/components/shadcn-space/button/button-02'
import EyebrowStar from '@/components/EyebrowStar'
import SplitLines from '@/components/SplitLines'
import type { SetPage } from '@/types'

interface FestivalsSectionProps {
  setPage: SetPage
}

/* Three festivals only — the ones the Festival Customs page goes deep on. This
   section is the doorway, not the encyclopedia: a paragraph each, then one CTA
   into the detail page. */
const festivals = [
  {
    name: 'Diwali',
    period: 'October – November',
    /* A flower kolam ringed with lit clay diyas, shot from above — the one plate
       in this trio that is unmistakably *Diwali* rather than lamp lighting in
       general. It replaces `photo-1702505433756-88130191bb4b`, which was a brass
       kuthuvilakku being lit against a teal wall: a fine devotional photograph,
       but it read as Karthigai (the card directly beside it) and its cool
       background was the only non-warm image on the homepage.

       Picked by rendering four candidates at this exact 900×675 crop and looking
       at them as a contact sheet, per CLAUDE.md §6 — three of the four did not
       show what their alt text claimed. Note this is now a *different* plate from
       the Festival Customs page's Diwali image; that page is out of this brief. */
    image: 'https://images.unsplash.com/photo-1635192592106-77a5aacbe1a3?w=900&h=675&fit=crop&auto=format',
    copy: 'The festival of lights turns every threshold into an altar. Rows of clay diyas are lit at dusk to welcome Lakshmi into the home — the first of them traditionally filled with pure sesame or ghee oil.',
  },
  {
    name: 'Karthigai Dheepam',
    period: 'November – December',
    image: 'https://images.unsplash.com/photo-1775427528127-a66ce3bb2bcb?w=900&h=675&fit=crop&auto=format',
    copy: 'The oldest festival of light in the Tamil calendar. As the great beacon is lit atop Arunachala, households ring doorways, windows and terraces with agal vilakku until an entire street glows as one.',
  },
  {
    name: 'Navarathri',
    period: 'September – October',
    image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?w=900&h=675&fit=crop&auto=format',
    copy: 'Nine nights for the Goddess in her three forms. A tiered kolu is arranged, a different fragrance of agarbatti is offered on each night, and sundal is shared with every neighbour who visits.',
  },
]

export default function FestivalsSection({ setPage }: FestivalsSectionProps) {
  return (
    <section id="festivals" className="section relative overflow-hidden" style={{ background: '#FFFDF7' }}>
      <div className="pattern-petal absolute inset-0" />

      <div className="shell-wide relative">

        {/* Same header shape as Neivedhyam below it — title left, intro on the
            right rail — so the two festival-facing sections rhyme. The CTA now
            closes the right column directly beneath the intro it belongs to,
            rather than sitting under the three cards — which is also why this row
            top-aligns where Neivedhyam's still bottom-aligns: with a button in it
            the right column is the taller of the two through the 992–1199 band,
            and bottom-aligned it started 34px above the eyebrow. */}
        <div className="grid12" style={{ alignItems: 'start', marginBottom: 'clamp(30px, 3.2vw, 44px)' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div className="eyebrow" data-anim="fade" style={{ marginBottom: 'var(--space-sm)' }}>
              <EyebrowStar />
              Festivals &amp; Traditions
            </div>
            <h2 className="h2">
              <SplitLines lines={['Light That Marks', <em className="serif-italic" style={{ color: '#8F1D25' }} key="y">the Year</em>]} />
            </h2>
          </div>
          <div style={{ gridColumn: '9 / span 4' }}>
            <p className="body" data-anim="fade" data-delay="0.1">
              Every Indian festival begins the same way — with a flame. These are the three
              that shape the Dheepam year, and the customs that carry them.
            </p>
            {/* One CTA for the whole section — each card is a summary, not its
                own destination. */}
            <div data-anim="fade" data-delay="0.2" style={{ marginTop: 'var(--space-sm)' }}>
              {/* The shiny CTA (2026-08-13) — `Button02` is the gold pill with
                  the ambient left→right reflection; nothing else changed. */}
              <Button02 onClick={() => setPage('home')}>
                Explore Festival Customs
              </Button02>
            </div>
          </div>
        </div>

        <div className="grid12" style={{ rowGap: 'clamp(28px, 3vw, 40px)' }}>
          {festivals.map((f, i) => (
            <article key={f.name} className="col-3up fest-card" data-anim="fade" data-delay={`${0.08 * i}`}>
              <div className="img-frame img-warm fest-card-media">
                <img
                  src={f.image}
                  srcSet={[
                    `${f.image.replace('w=900&h=675', 'w=600&h=450')} 600w`,
                    `${f.image} 900w`,
                  ].join(', ')}
                  sizes="(max-width: 767.98px) 92vw, (max-width: 991.98px) 30vw, 30vw"
                  width={900}
                  height={675}
                  alt={f.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="micro t-gold fest-card-period">{f.period}</span>
              <h3 className="h4 fest-card-name">{f.name}</h3>
              <p className="body-sm">{f.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
