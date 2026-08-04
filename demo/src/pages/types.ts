import type { ComponentType } from "react"

export interface SinkPage {
  /** URL segment under /c/<group>/, kebab-case, unique in the group. */
  id: string
  /** Sidebar and card label. */
  label: string
  /** One-liner shown on group overview cards and as the page subtitle. */
  description: string
  /** Lazy loader; the page module default-exports its component. */
  load: () => Promise<{ default: ComponentType }>
}

export interface SinkGroup {
  /** URL segment: /c/<slug>/... */
  slug: string
  label: string
  pages: SinkPage[]
}
