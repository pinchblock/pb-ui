import type { SinkGroup } from "../types.ts"

/* One line per page; appended in place (parallel-agent safe). */
export const group: SinkGroup = {
  slug: "overlays",
  label: "Overlays",
  pages: [
    { id: "dialog", label: "Dialog", description: "Modal task surface: sm/md/lg sizes, bottom-sheet presentation under sm.", load: () => import("./dialog.tsx") },
    { id: "sheet", label: "Sheet", description: "Edge panels on the Base UI Drawer: right/bottom/left, swipe to dismiss, pinned header and footer.", load: () => import("./sheet.tsx") },
    { id: "popover", label: "Popover", description: "Anchored non-modal popup: optional arrow, full positioner control.", load: () => import("./popover.tsx") },
    { id: "dropdown-menu", label: "Dropdown menu", description: "Overflow action menus: icons, checkbox and radio items, destructive items.", load: () => import("./dropdown-menu.tsx") },
    { id: "toast", label: "Toast", description: "Stacked notifications in five tones, fired imperatively from anywhere.", load: () => import("./toast.tsx") },
    { id: "confirm-dialog", label: "Confirm dialog", description: "Promise-based window.confirm replacement on the alert-dialog primitive.", load: () => import("./confirm-dialog.tsx") },
    { id: "hover-card", label: "Hover card", description: "Profile previews on hover or focus, with a tap fallback on touch.", load: () => import("./hover-card.tsx") },
  ],
}
