import type { SinkGroup } from "../types.ts"

/* One line per page; kit pages name every component they cover. */
export const group: SinkGroup = {
  slug: "layout",
  label: "Layout & Navigation",
  pages: [
    { id: "stack-row", label: "Stack & Row", description: "Kit: Stack, Row and Grow, the flex primitives with a token gap scale.", load: () => import("./stack-row.tsx") },
    { id: "page", label: "Page", description: "Width-capped content container with responsive padding, five sizes.", load: () => import("./page.tsx") },
    { id: "app-shell", label: "App shell", description: "Kit: AppShell, NavRail, MobileTabBar and TopBar, the authenticated chrome family.", load: () => import("./app-shell.tsx") },
    { id: "phone-frame", label: "PhoneFrame", description: "Marketing device frame for landing showcases and in-frame app previews.", load: () => import("./phone-frame.tsx") },
    { id: "glass", label: "Glass & marketing", description: "Glass utilities kit: glass-card/panel/chip, pb-backdrop, text-gradient-primary, eyebrow.", load: () => import("./glass.tsx") },
  ],
}
