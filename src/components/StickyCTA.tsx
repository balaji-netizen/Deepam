import { useEffect, useState } from 'react'

interface StickyCTAProps {
  /** Opens the dedicated devotional knowledge page. */
  onOpen: () => void
}

/**
 * Vertical launcher for the devotional knowledge experience: a tab fixed to the
 * right edge of the viewport, centred vertically, with its label set on its
 * side. It sits outside the 1480/1520 rails at every width the brief lists, so
 * it never lands on copy, and it is below the nav's z-index so it cannot cover
 * the menu.
 */
export default function StickyCTA({ onOpen }: StickyCTAProps) {
  const [visible, setVisible] = useState(false)
  const [teasing, setTeasing] = useState(false)

  // Hold it back until the hero is behind the reader
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* One-time nudge: the bubble opens itself briefly the first time the launcher
     appears, the way a chat widget greets you, then tucks away for good. */
  useEffect(() => {
    if (!visible) return
    if (sessionStorage.getItem('dheepam-quiz-teased')) return
    const show = window.setTimeout(() => setTeasing(true), 900)
    const hide = window.setTimeout(() => {
      setTeasing(false)
      sessionStorage.setItem('dheepam-quiz-teased', '1')
    }, 6200)
    return () => { window.clearTimeout(show); window.clearTimeout(hide) }
  }, [visible])

  return (
    <div
      className={`quiz-fab-wrap${visible ? ' is-visible' : ''}${teasing ? ' is-teasing' : ''}`}
      aria-live="off"
    >
      {/* Greeting bubble — decorative, the tab beside it carries the real label */}
      <div className="quiz-bubble" aria-hidden="true">
        <p className="quiz-bubble-text">Think you know your rituals?</p>
        <span className="quiz-bubble-tail" />
      </div>

      <button className="quiz-fab" onClick={onOpen} aria-label="Test your devotional knowledge">
        <span className="quiz-fab-icon" aria-hidden="true">
          {/* Dheepam flame */}
          <svg width="18" height="22" viewBox="0 0 22 26" fill="none">
            <path
              d="M11 1.5C11 1.5 4.5 8 4.5 14.2a6.5 6.5 0 0013 0C17.5 8 11 1.5 11 1.5Z"
              fill="currentColor" opacity="0.22"
            />
            <path
              d="M11 6c0 0-3.4 3.7-3.4 7.3a3.4 3.4 0 006.8 0C14.4 9.7 11 6 11 6Z"
              fill="currentColor"
            />
          </svg>
        </span>

        {/* Set on its side by the CSS below; the phone step hides it and leaves
            the flame alone, which is all a 320px screen has room for. */}
        <span className="quiz-fab-label">Test Your Devotional Knowledge</span>
      </button>
    </div>
  )
}
