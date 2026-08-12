import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'gold' | 'line'
type Size = 'sm' | 'md'

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: boolean
  iconDirection?: 'right' | 'left'
  magnetic?: boolean
  className?: string
  style?: React.CSSProperties
  children: ReactNode
}

type AsAnchor = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }
type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export type ButtonProps = AsAnchor | AsButton

const variantClass: Record<Variant, string> = {
  solid: 'cta-solid',
  outline: 'cta-outline',
  gold: 'cta-gold',
  line: 'cta-line',
}

function Arrow({ direction }: { direction: 'right' | 'left' }) {
  return (
    <svg
      className="cta-arrow"
      width="20" height="8" viewBox="0 0 20 8" fill="none"
      style={direction === 'left' ? { transform: 'rotate(180deg)' } : undefined}
      aria-hidden="true"
    >
      <path d="M0 4h18M14.5 0.5L18.5 4l-4 3.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/**
 * Editorial CTA. Renders an <a> when `href` is present, otherwise a <button>.
 * `magnetic` opts the element into the cursor-attraction effect (fine pointers only).
 */
export default function Button({
  variant = 'solid',
  size = 'md',
  icon = true,
  iconDirection = 'right',
  magnetic = false,
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = [
    'cta',
    variantClass[variant],
    size === 'sm' ? 'cta-sm' : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && iconDirection === 'left' && <Arrow direction="left" />}
      <span>{children}</span>
      {icon && iconDirection === 'right' && <Arrow direction="right" />}
    </>
  )

  const el = href ? (
    <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {content}
    </a>
  ) : (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )

  return magnetic ? <span className="magnetic">{el}</span> : el
}
