/**
 * The single source of truth for routing. Every component that navigates takes
 * this type — previously each one redeclared its own copy of the union, so
 * adding a route broke them all with "two different types with this name".
 */
export type Page =
  | 'home'
  | 'lamp-lighting'
  | 'festival-customs'
  | 'contact'
  | 'knowledge'

export type SetPage = (p: Page) => void
