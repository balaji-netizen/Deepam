import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import Button from '@/components/Button'
import './button-02.css'

/**
 * button-02 — the Dheepam shiny CTA.
 *
 * The shadcn shiny-button pattern (a narrow reflection swept left → right
 * by a pseudo-element) adapted to this site's CTA system rather than to
 * shadcn's white/dark default.
 *
 * It is a *skin*, not a second button. Everything structural — the `<a>`
 * vs `<button>` decision, the label span, the shared arrow glyph, the
 * pill corner, the 44px box, 14px Figtree at 600 with 0.1em tracking —
 * comes from the site's own `<Button variant="gold">`. This component
 * adds one class, `.btn-02`, and `button-02.css` hangs the reflection and
 * its accessibility guarantees off that class. Consequences worth
 * knowing:
 *
 * - **`variant` is not a prop.** The Dheepam shiny CTA is the gold pill;
 *   anything else would be a different button.
 * - **The reflection paints behind the label, never over it.** That is
 *   what keeps the label at 7.81:1 or better at every frame of the
 *   sweep — see the contrast note in `button-02.css`.
 * - **It is off under `prefers-reduced-motion`**, at the element rather
 *   than by the global duration clamp.
 *
 * Scope: applied to the home page's content CTAs only. `Shop Now` on
 * both product tiles and the Neivedhyam control-row CTA keep their
 * `variant="line"` treatment by brief and must not be converted.
 */

interface Button02Common {
  size?: 'sm' | 'md'
  icon?: boolean
  iconDirection?: 'right' | 'left'
  /** Passed through, but the homepage CTAs are deliberately static — see CLAUDE.md §5. */
  magnetic?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}

type Button02Anchor =
  & Button02Common
  & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
  & { href: string }

type Button02Button =
  & Button02Common
  & ButtonHTMLAttributes<HTMLButtonElement>
  & { href?: undefined }

export type Button02Props = Button02Anchor | Button02Button

export default function Button02({ className = '', ...rest }: Button02Props) {
  /* Hand-written design-system class names, so the space before `${` is
     cosmetic here rather than load-bearing — but CLAUDE.md §10 asks for
     it unconditionally and a Tailwind utility must never be glued to an
     interpolation, so the rule is kept whatever the class is. */
  const classes = className ? `btn-02 ${className}` : 'btn-02'

  return rest.href !== undefined
    ? <Button variant="gold" className={classes} {...(rest as Button02Anchor)} />
    : <Button variant="gold" className={classes} {...(rest as Button02Button)} />
}
