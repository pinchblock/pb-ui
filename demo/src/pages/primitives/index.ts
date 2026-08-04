import type { SinkGroup } from "../types.ts"

/* Pages are added by the sink v2 migration; one line per page. */
export const group: SinkGroup = {
  slug: "primitives",
  label: "Primitives",
  pages: [
    { id: "button", label: "Button", description: "The action primitive: variants, sizes, loading, icons, pill.", load: () => import("./button.tsx") },
  ],
}
