import { useCallback, useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StickyCTA from '@/components/StickyCTA'
import BrandStory from '@/components/BrandStory'
import ProductsShowcase from '@/components/ProductsShowcase'
import LampLightingSection from '@/components/LampLightingSection'
import FestivalsSection from '@/components/FestivalsSection'
import NeivedhyamSection from '@/components/NeivedhyamSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import LampLightingPage from '@/components/LampLightingPage'
import FestivalCustomsPage from '@/components/FestivalCustomsPage'
import ContactPage from '@/components/ContactPage'
import KnowledgePage from '@/components/KnowledgePage'
import { useReveal, useMagnetic } from '@/hooks/useReveal'

type Page = 'home' | 'lamp-lighting' | 'festival-customs' | 'contact' | 'knowledge'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  useReveal([currentPage])
  useMagnetic()

  const setPage = useCallback((p: Page) => {
    setCurrentPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 104
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#FFFDF7' }}>
      <Navbar currentPage={currentPage} setPage={setPage} scrollToSection={scrollToSection} />

      <main key={currentPage}>
        {currentPage === 'home' && (
          /* `.home-page` is the scope hook for the homepage-only rules in
             index.css (CTA band, headline masks). It is a plain block wrapper —
             the sections still own their own backgrounds and rails. */
          <div className="home-page">
            <HeroSection />
            <BrandStory />
            <ProductsShowcase />
            <LampLightingSection setPage={setPage} />

            {/* The one ornament that sits *between* sections: a kolam hairline
                marking the seam from the lamp-lighting guide into the festival
                year. Centre motif is the eyebrow's four-petal star flanked by
                diamonds and pulli dots — the same vocabulary, at rule scale.
                Static by design, like Our Story's `.story-divider`. */}
            <div className="rule-kolam rule-temple" role="presentation">
              <svg width="148" height="18" viewBox="0 0 148 18" fill="none" aria-hidden="true">
                <g fill="currentColor">
                  <circle cx="18" cy="9" r="1.3" opacity="0.55" />
                  <circle cx="130" cy="9" r="1.3" opacity="0.55" />
                  <circle cx="32" cy="9" r="2" opacity="0.72" />
                  <circle cx="116" cy="9" r="2" opacity="0.72" />
                  <path d="M48 5.5 51.5 9 48 12.5 44.5 9Z" opacity="0.8" />
                  <path d="M100 5.5 103.5 9 100 12.5 96.5 9Z" opacity="0.8" />
                </g>
                <g transform="translate(65 0) scale(1.3846)">
                  <g fill="currentColor" opacity="0.85">
                    <path d="M6.5 0c.9 1.7.9 3.4 0 5.1-.9-1.7-.9-3.4 0-5.1Z" />
                    <path d="M6.5 13c-.9-1.7-.9-3.4 0-5.1.9 1.7.9 3.4 0 5.1Z" />
                    <path d="M0 6.5c1.7-.9 3.4-.9 5.1 0-1.7.9-3.4.9-5.1 0Z" />
                    <path d="M13 6.5c-1.7.9-3.4.9-5.1 0 1.7-.9 3.4-.9 5.1 0Z" />
                  </g>
                  <circle cx="6.5" cy="6.5" r="1.15" fill="currentColor" />
                </g>
              </svg>
            </div>

            <FestivalsSection setPage={setPage} />
            <NeivedhyamSection setPage={setPage} scrollToSection={scrollToSection} />
            <FAQSection />
          </div>
        )}

        {currentPage === 'lamp-lighting' && <LampLightingPage setPage={setPage} />}
        {currentPage === 'festival-customs' && <FestivalCustomsPage setPage={setPage} />}
        {currentPage === 'contact' && <ContactPage setPage={setPage} />}
        {currentPage === 'knowledge' && <KnowledgePage setPage={setPage} />}
      </main>

      <Footer setPage={setPage} scrollToSection={scrollToSection} />
      {/* Hidden on its own page — nothing to route to from there */}
      {currentPage !== 'knowledge' && <StickyCTA onOpen={() => setPage('knowledge')} />}
    </div>
  )
}
