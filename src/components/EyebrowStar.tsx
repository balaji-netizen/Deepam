/**
 * The four-petal kolam star that sits between an eyebrow's gold hairline and its
 * label. Lifted out of Our Story — it was inline there and nowhere else — so
 * every homepage eyebrow can carry the same mark from one definition.
 *
 * Draws in `currentColor`, so it inherits the eyebrow's maroon rather than
 * pinning a hex, and `.eyebrow-star` in index.css holds its spacing.
 */
export default function EyebrowStar() {
  return (
    <svg className="eyebrow-star" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <g fill="currentColor" opacity="0.85">
        <path d="M6.5 0c.9 1.7.9 3.4 0 5.1-.9-1.7-.9-3.4 0-5.1Z" />
        <path d="M6.5 13c-.9-1.7-.9-3.4 0-5.1.9 1.7.9 3.4 0 5.1Z" />
        <path d="M0 6.5c1.7-.9 3.4-.9 5.1 0-1.7.9-3.4.9-5.1 0Z" />
        <path d="M13 6.5c-1.7.9-3.4.9-5.1 0 1.7-.9 3.4-.9 5.1 0Z" />
      </g>
      <circle cx="6.5" cy="6.5" r="1.15" fill="currentColor" />
    </svg>
  )
}
