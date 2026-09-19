import type { SinkGroup } from "../types.ts"

export const group: SinkGroup = {
  slug: "foundations",
  label: "Foundations",
  pages: [
    { id: "colors", label: "Colors", description: "Semantic color tokens: surfaces, text, brand, status, chrome and chart scales, all live per theme.", load: () => import("./colors.tsx") },
    { id: "typography", label: "Typography", description: "Type scale, fluid display sizes, families and the eyebrow label, all riding --font-scale.", load: () => import("./typography.tsx") },
    { id: "motion", label: "Motion", description: "Duration and easing tokens with hover previews and the CSS vs Motion-for-React split.", load: () => import("./motion.tsx") },
    { id: "themes", label: "Themes", description: "Every theme in light and dark side by side, re-themed per subtree with pure CSS classes.", load: () => import("./themes.tsx") },
    { id: "brand-icon", label: "App icon", description: "The dumbbell mark composed at every launcher, favicon and header size, with framing and environment controls for review.", load: () => import("./brand-icon.tsx") },
    { id: "email", label: "Email", description: "The transactional email template: brand header, message sheet, optional action and a footer with links and info.", load: () => import("./email.tsx") },
    { id: "icons", label: "Icons", description: "Every Phosphor icon in use, from the generated manifest; live under the weight toggle.", load: () => import("./icons.tsx") },
  ],
}
