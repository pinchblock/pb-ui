/**
 * Sink v2 registry. Composes the per-group manifests; the sidebar,
 * routes and overview pages all derive from GROUPS. Adding a page
 * means: create pages/<group>/<id>.tsx and add one line to that
 * group's index.ts. Nothing else changes (parallel-agent safe).
 */
import { lazy, type ComponentType, type LazyExoticComponent } from "react"

import type { SinkGroup, SinkPage } from "./types.ts"
import { group as foundations } from "./foundations/index.ts"
import { group as primitives } from "./primitives/index.ts"
import { group as forms } from "./forms/index.ts"
import { group as overlays } from "./overlays/index.ts"
import { group as content } from "./content/index.ts"
import { group as charts } from "./charts/index.ts"
import { group as media } from "./media/index.ts"
import { group as layout } from "./layout/index.ts"
import { group as stage } from "./stage/index.ts"

export const GROUPS: SinkGroup[] = [
  foundations,
  primitives,
  forms,
  overlays,
  content,
  charts,
  media,
  layout,
  stage,
]

/** Stable lazy components, created once at module scope. */
const LAZY = new Map<string, LazyExoticComponent<ComponentType>>()
for (const g of GROUPS) {
  for (const p of g.pages) {
    LAZY.set(`${g.slug}/${p.id}`, lazy(p.load))
  }
}

export function findGroup(slug: string | undefined): SinkGroup | undefined {
  return GROUPS.find((g) => g.slug === slug)
}

export function findPage(
  groupSlug: string | undefined,
  pageId: string | undefined,
): { group: SinkGroup; page: SinkPage; Component: LazyExoticComponent<ComponentType> } | undefined {
  const group = findGroup(groupSlug)
  const page = group?.pages.find((p) => p.id === pageId)
  const Component = LAZY.get(`${groupSlug}/${pageId}`)
  if (!group || !page || !Component) return undefined
  return { group, page, Component }
}
