import type { SinkGroup } from "../types.ts"

/* Pages are added by the sink v2 migration; one line per page. */
export const group: SinkGroup = {
  slug: "content",
  label: "Content",
  pages: [
    { id: "card", label: "Card", description: "Compound surface: header, content, footer; default, interactive, glass, sunken.", load: () => import("./card.tsx") },
    { id: "list-row", label: "ListRow", description: "Inbox/roster/settings row: leading, title + meta, trailing; interactive or static.", load: () => import("./list-row.tsx") },
    { id: "table", label: "Table", description: "Data table primitives: uppercase header, numeric/mono cells, scroll container.", load: () => import("./table.tsx") },
    { id: "tabs", label: "Tabs", description: "Underline and pill tabs on Base UI; icons, overflow scroll, keyboard arrows.", load: () => import("./tabs.tsx") },
    { id: "alert", label: "Alert", description: "Inline banner in five tones with action slot and dismiss; ai tone for AI moments only.", load: () => import("./alert.tsx") },
    { id: "stat-tile", label: "StatTile", description: "KPI tile: label, display value, trend with explicit good/bad, footnote.", load: () => import("./stat-tile.tsx") },
    { id: "page-header", label: "PageHeader", description: "Page title with description, actions row and optional back link; md and lg sizes.", load: () => import("./page-header.tsx") },
    { id: "section-header", label: "SectionHeader", description: "Eyebrow section title with optional icon and action slot for dashboard regions.", load: () => import("./section-header.tsx") },
    { id: "toggle-row", label: "ToggleRow", description: "Settings row with a trailing switch; whole row is the label, switch is the target.", load: () => import("./toggle-row.tsx") },
    { id: "accordion", label: "Accordion", description: "Animated disclosure list; single-open by default, multiple for reference panels.", load: () => import("./accordion.tsx") },
    { id: "pagination", label: "Pagination", description: "Prev/next with ellipsis page numbers; compact page-X-of-Y variant for tight spots.", load: () => import("./pagination.tsx") },
    { id: "empty-state", label: "EmptyState", description: "Icon, title, body and CTA for empty lists and no-results; chromeless or dashed.", load: () => import("./empty-state.tsx") },
    { id: "stepper", label: "Stepper", description: "Presentational step indicator: numbered dots for wizards, bars for workout progress.", load: () => import("./stepper.tsx") },
    { id: "example-dashboard", label: "Coach dashboard", description: "Composed slice: PageHeader, StatTiles, table card with pagination, EmptyState, ToggleRows.", load: () => import("./example-dashboard.tsx") },
  ],
}
