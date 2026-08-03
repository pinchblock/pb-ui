/**
 * Sink registry. The sidebar nav is generated from GROUPS, so adding a
 * section to a group file makes it appear automatically. Rule: every
 * new library component MUST get a sink section or it is incomplete.
 *
 * Each group file is owned independently (parallel-editing friendly):
 * add sections in the group file, not here.
 */
import type { SinkSection } from "./types.ts"

import { sections as foundations } from "./foundations.tsx"
import { sections as primitives } from "./primitives.tsx"
import { sections as forms } from "./forms.tsx"
import { sections as overlays } from "./overlays.tsx"
import { sections as content } from "./content.tsx"
import { sections as charts } from "./charts.tsx"
import { sections as media } from "./media.tsx"
import { sections as layout } from "./layout.tsx"

export interface SinkGroup {
  label: string
  sections: SinkSection[]
}

export const GROUPS: SinkGroup[] = [
  { label: "Foundations", sections: foundations },
  { label: "Primitives", sections: primitives },
  { label: "Forms", sections: forms },
  { label: "Overlays", sections: overlays },
  { label: "Content", sections: content },
  { label: "Charts", sections: charts },
  { label: "Media & Motion", sections: media },
  { label: "Layout & Navigation", sections: layout },
]
