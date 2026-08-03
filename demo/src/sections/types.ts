import type { ReactNode } from "react"

export interface SinkSection {
  /** Anchor id, kebab-case, unique across the whole sink. */
  id: string
  /** Sidebar label. */
  label: string
  render: () => ReactNode
}
