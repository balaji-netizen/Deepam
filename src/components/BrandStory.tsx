import EyebrowStar from '@/components/EyebrowStar'
import SplitLines from '@/components/SplitLines'
import storyPlate from '@/imports/our-story.webp'

export default function BrandStory() {
  /* Two-column editorial, adopted against the Our Story reference: copy on the
     left half, one near-square devotional plate on the right, on a warm cream
     surface. The reveal choreography is untouched — every `data-anim` and
     `data-delay` below is the value it has always had, on the same piece of
     content. */
  return (
    <section id="brand-story" className="story section relative overflow-hidden">
      {/* The section's one ornament, unchanged and still the slow-spinning
          mandala — only cropped into the top-right corner now, the way the
          reference puts its gold linework. `overflow-hidden` on the section is
          what does the cropping. */}
      <div
        className="mandala-faint mandala-spin position-absolute d-none d-xl-block"
        style={{ width: 560, height: 560, right: '-168px', top: '-172px', opacity: 0.42, pointerEvents: 'none' }}
      />

      <div className="shell-wide relative">
        {/* Halves, not 6/5: the reference splits the row down the middle with a
            single gutter between the copy and the plate. The eyebrow is inside
            the copy column so the plate's top edge lands level with it. */}
        <div className="grid12" style={{ rowGap: 'var(--space-content)', alignItems: 'start' }}>

          <div className="story-copy" style={{ gridColumn: '1 / span 6' }}>
            <div className="eyebrow" data-anim="fade">
              <EyebrowStar />
              Our Story
            </div>

            <h2 className="h2 story-head">
              <SplitLines
                lines={[
                  <span className="t-maroon" key="flame">Born of Flame,</span>,
                  <em className="serif-italic story-head-gold" key="faith">Built on Faith</em>,
                ]}
              />
            </h2>

            {/* Hairline with a centred diamond — the site's existing
                `.rule-kolam`, not a new ornament. Deliberately carries no
                `data-anim`: the brief holds the section's reveal set as it is. */}
            <div className="rule-kolam story-divider">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 0L12 6L6 12L0 6Z" fill="currentColor" opacity="0.7" />
              </svg>
            </div>

            <div className="story-prose">
              {/* The "Pure, trusted, and crafted for every ritual…" line that used
                  to open this prose has gone back to the Products header, where
                  it was authored and where the brief now wants it — on the right
                  of "Objects of Daily Devotion". The two paragraphs left are the
                  reference's own two, each keeping the reveal delay it had. */}
              <p className="body" data-anim="fade" data-delay="0.1">
                Dheepam was born from a simple belief: that devotion deserves purity. As the
                devotional brand of Kaleesuwari — one of India's most trusted FMCG names —
                Dheepam carries forward more than a century of commitment to quality, faith, and family.
              </p>
              <p className="body" data-anim="fade" data-delay="0.16">
                In every home where a lamp is lit at dawn, where incense curls skyward at dusk —
                Dheepam is there. Not as a product, but as a presence.
              </p>
            </div>

            {/* Same blockquote, same reveal — restyled into the reference's
                cream card: gold rule down the left edge, gold quote glyph, and
                the petal pattern fading in from the right. */}
            <blockquote className="story-quote" data-anim="fade" data-delay="0.2">
              <div className="pattern-petal story-quote-petals absolute inset-0" />
              <span className="story-quote-mark" aria-hidden="true">&ldquo;</span>
              <div>
                <p className="h4 serif-italic t-maroon story-quote-text">
                  &ldquo;A lamp lit with faith can illuminate generations.&rdquo;
                </p>
                <p className="micro">A Kaleesuwari Legacy · Millions of Homes</p>
              </div>
            </blockquote>
          </div>

          <div className="story-media" style={{ gridColumn: '7 / span 6' }}>
            {/* Sharp-cornered rectangular frame, 14:15 like the reference. The
                ratio lives in CSS (`.story-plate`), never inline — an inline
                value outranks every media query, which is what stopped the
                folded breakpoints from being able to touch it at all.
                `.img-warm` is gone: the plate is graded warm in the asset
                itself, and the maroon wash on top only muddied it.

                The supplied `Images/Our Story.png` is authored at exactly 14:15
                (520×557), so it now decodes with zero crop at *every* width —
                which is why the folded band no longer flattens the frame. */}
            <div className="img-frame story-plate" data-anim="mask">
              <img
                src={storyPlate}
                sizes="(max-width: 991.98px) min(520px, 92vw), 520px"
                width={520}
                height={557}
                alt="A clay diya burning beside a bottle of Dheepam lamp oil, with a brass kuthuvilakku and marigolds"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
