import type { SinkGroup } from "../types.ts"

/* Pages are added by the sink v2 migration; one line per page. */
export const group: SinkGroup = {
  slug: "primitives",
  label: "Primitives",
  pages: [
    { id: "button", label: "Button", description: "The action primitive: variants, sizes, loading, icons, pill.", load: () => import("./button.tsx") },
    { id: "badge", label: "Badge", description: "Status pills and chips, plus TagPill for quieter sport tags and filters.", load: () => import("./badge.tsx") },
    { id: "avatar", label: "Avatar", description: "Person identity with deterministic fallback colors, plus AvatarGroup stacks.", load: () => import("./avatar.tsx") },
    { id: "icon-button", label: "IconButton", description: "Icon-only button with a badge slot for unread counts and dots.", load: () => import("./icon-button.tsx") },
    { id: "counter-badge", label: "CounterBadge", description: "Unread-count pill and NotificationDot, inline or overlaid via surfaceRing.", load: () => import("./counter-badge.tsx") },
    { id: "spinner", label: "Spinner", description: "Indeterminate loading indicator that announces itself to screen readers.", load: () => import("./spinner.tsx") },
    { id: "skeleton", label: "Skeleton", description: "Placeholder blocks and SkeletonText that mirror the loaded layout.", load: () => import("./skeleton.tsx") },
    { id: "progress", label: "Progress", description: "Determinate and indeterminate bar for goals, blocks and syncs.", load: () => import("./progress.tsx") },
    { id: "tooltip", label: "Tooltip", description: "Shared-delay tooltips for naming icon controls and shortcut hints.", load: () => import("./tooltip.tsx") },
    { id: "kbd", label: "Kbd", description: "Keyboard key caps for shortcut hints, inline or inside tooltips.", load: () => import("./kbd.tsx") },
    { id: "separator", label: "Separator", description: "Semantic divider, horizontal between blocks or vertical in meta rows.", load: () => import("./separator.tsx") },
  ],
}
