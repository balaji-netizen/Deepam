import PageHero from '@/components/PageHero'
import DevotionalQuiz from '@/components/DevotionalQuiz'
import type { SetPage } from '@/types'

interface KnowledgePageProps {
  setPage: SetPage
}

/**
 * Dedicated home for the devotional knowledge experience. Lifted off the
 * homepage so the quiz gets room to breathe as its own destination; the sticky
 * CTA routes here instead of scrolling to a section.
 */
export default function KnowledgePage({ setPage }: KnowledgePageProps) {
  return (
    <div style={{ background: '#FFFDF7' }}>
      <PageHero
        eyebrow="Interactive Experience"
        lines={['Test Your', <em className="serif-italic" style={{ color: '#8F1D25' }} key="k">Devotional Knowledge</em>]}
        intro="Ten true-or-false questions on lamp lighting, agarbatti, and the devotional traditions behind them."
        image="https://images.unsplash.com/photo-1597393646842-4d899e15777e?w=1900&h=1000&fit=crop&auto=format"
        onBack={() => setPage('home')}
      />

      <DevotionalQuiz />
    </div>
  )
}
