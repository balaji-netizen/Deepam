import EyebrowStar from '@/components/EyebrowStar'
import SplitLines from '@/components/SplitLines'
import lampOilImg from '@/imports/products/lamp-oil-scene.webp'
import agarbattiImg from '@/imports/products/agarbatti-scene.webp'

/* `chip` is the label laid over the photograph; `tag` is the gold merch note in
   the meta row beneath it — the two-label structure the reference uses.
   `scene: true` means the asset is a full set photograph that fills the tile;
   otherwise it is a cut-out packshot composed onto the plinth, and `shot` sets
   its height (the cut-outs range from a tall single bottle to a wide 3-pack).

   Both SKUs are scenes as of the supplied artwork, so the packshot treatment has
   no consumer right now. It is typed rather than deleted: `.tile-shot` /
   `.tile-ground` and the three cut-outs still in `imports/products/` are the
   documented alternative treatment, and a future SKU that arrives as a cut-out
   should not have to have it rebuilt. */
interface Product {
  label: string
  chip: string
  tag: string
  tagline: string
  image: string
  /** Full set photograph — fills the frame instead of standing on the plinth. */
  scene?: boolean
  /** Packshot height on the plinth. Only read when `scene` is falsy. */
  shot?: string
  w: number
  h: number
}

const products: Product[] = [
  {
    label: 'Lamp Oil',
    chip: 'Pure & Sacred',
    tag: 'Up to 20% Off',
    tagline: 'Cold-pressed sesame & coconut oils for a steady, bright, smoke-free flame.',
    image: lampOilImg,
    scene: true,
    w: 1400,
    h: 646,
  },
  {
    /* Also a scene now. The supplied `Images/Agarbatti.png` is a full set
       photograph on the same gold backdrop as the lamp-oil shot — same brass
       kuthuvilakku, same flower bowl, same light — not a cut-out, so composing
       it onto the plinth would have put a photographed background inside a
       painted one. Its native ratio is 2.1618:1 against the tile's 13:6
       (2.1667), so it fills the frame with a 2px height trim and no crop. */
    label: 'Agarbatti',
    chip: 'Fragrance & Purity',
    tag: 'Bestseller',
    tagline: 'Hand-rolled incense in jasmine, sandalwood, rose & camphor — for a serene puja room.',
    image: agarbattiImg,
    scene: true,
    w: 1400,
    h: 646,
  },
]

export default function ProductsShowcase() {
  return (
    <section id="products" className="section relative" style={{ background: '#FFFDF7' }}>
      <div className="pattern-petal absolute inset-0" />

      <div className="shell-wide relative">

        {/* Header is two halves on the tiles' own rails: eyebrow + title over the
            left tile (1–6), the supporting line over the right one (7–12), so the
            description is aligned with the objects it introduces rather than
            floating on a rail of its own. Bottom-aligned, so the line sits level
            with the foot of the headline. */}
        <div className="grid12 fold-head" style={{ alignItems: 'end', marginBottom: 'clamp(38px, 3.6vw, 54px)' }}>
          <div style={{ gridColumn: '1 / span 6' }}>
            <div className="eyebrow" data-anim="fade" style={{ marginBottom: 'var(--space-sm)' }}>
              <EyebrowStar />
              The Dheepam Range
            </div>
            <h2 className="h2">
              <SplitLines lines={['Objects of', <em className="serif-italic" style={{ color: '#8F1D25' }} key="d">Daily Devotion</em>]} />
            </h2>
          </div>
          <div style={{ gridColumn: '7 / span 6' }}>
            <p className="body" data-anim="fade" data-delay="0.1" style={{ maxWidth: 480 }}>
              Pure, trusted, and crafted for every ritual — from the daily dawn lamp to the
              grandest festival table.
            </p>
          </div>
        </div>

        {/* Large editorial tiles, two across: photograph, then a meta row of
            index + merch tag, a hairline, and the product entry beneath. */}
        <div className="grid12" style={{ rowGap: 'clamp(40px, 4vw, 56px)' }}>
          {products.map((p, i) => (
            <article key={p.label} className="col-2up">
              <a
                href="https://kaleesuwari.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tile-link block"
              >
                <div
                  className={`tile-plinth fold-plinth${p.scene ? ' is-scene' : ''}`}
                  data-anim="fade"
                  data-delay={String((i % 2) * 0.08)}
                  style={{ marginBottom: 22 }}
                >
                  <span className="tile-chip">{p.chip}</span>
                  {p.scene ? (
                    <img
                      className="tile-scene"
                      src={p.image}
                      alt={`Dheepam ${p.label}`}
                      width={p.w}
                      height={p.h}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <>
                      <span className="tile-ground" />
                      <img
                        className="tile-shot"
                        src={p.image}
                        alt={`Dheepam ${p.label}`}
                        width={p.w}
                        height={p.h}
                        loading="lazy"
                        decoding="async"
                        style={{ '--shot-h': p.shot } as React.CSSProperties}
                      />
                    </>
                  )}
                </div>

                <div data-anim="fade" data-delay={String((i % 2) * 0.08 + 0.06)}>
                  {/* No index here: two products are a pair, not a sequence, so
                      a running number would be ornament. The merch note is the
                      only thing in this row that carries information. */}
                  <div className="flex" style={{ marginBottom: 12 }}>
                    <span className="micro t-gold">{p.tag}</span>
                  </div>
                  <div className="rule-hair" style={{ marginBottom: 'clamp(14px, 2vh, 22px)' }} />
                  <h3 className="h3 tile-title" style={{ marginBottom: 'clamp(8px, 1.3vh, 14px)' }}>{p.label}</h3>
                  <p className="body" style={{ marginBottom: 'clamp(14px, 2.2vh, 24px)', maxWidth: 440 }}>{p.tagline}</p>
                  {/* Still a `<span>`, not a button — the whole tile is the
                      link, and nesting an interactive element inside it would
                      be invalid. **Back to `.cta-line`** (2026-08-12 brief:
                      revert Shop Now to its previous style) after one session
                      as a gold pill: a bare label with an underline that draws
                      out on hover, and no shine — the shimmer belongs to the
                      filled pills only. */}
                  <span className="cta cta-line">
                    <span>Shop Now</span>
                    <svg className="cta-arrow" width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                      <path d="M0 4h18M14.5 0.5L18.5 4l-4 3.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
