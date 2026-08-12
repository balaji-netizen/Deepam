import type { ReactNode } from 'react'

/**
 * Wraps each line in an overflow-hidden mask so GSAP can slide it up from below.
 * Lines are authored explicitly rather than measured, which keeps the reveal
 * stable across font loading and viewport changes.
 */
export default function SplitLines({
  lines,
  className = '',
  delay = 0,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
}) {
  return (
    <span data-anim="line" data-delay={delay} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </span>
  )
}
