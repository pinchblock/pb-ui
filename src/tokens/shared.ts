import type { SharedTokens } from "./types.ts"

/**
 * Non-color tokens shared by every theme. Themes are color-only;
 * radius, type, density and motion stay stable across theme swaps
 * and have their own runtime knobs.
 */
export const shared: SharedTokens = {
  radius: "0.625rem",
  fontScale: 1,
  density: 1,
  fontSans:
    'InterVariable, Inter, Arial, Helvetica, "Helvetica Neue", system-ui, sans-serif',
  fontDisplay:
    'InterVariable, Inter, Arial, Helvetica, "Helvetica Neue", system-ui, sans-serif',
  fontMono:
    'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
  motion: {
    duration: {
      fast: "120ms",
      base: "200ms",
      slow: "320ms",
      slower: "500ms",
    },
    ease: {
      out: "cubic-bezier(0.22, 1, 0.36, 1)",
      inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
}

/**
 * Type scale emitted to Tailwind text-* utilities, multiplied by
 * --font-scale at runtime. Sizes in rem so browser zoom still works.
 * Display sizes are fluid (clamp) for B2C hero/marketing surfaces.
 */
export const textScale: Record<string, { size: string; lineHeight: string }> = {
  xs: { size: "0.75rem", lineHeight: "1rem" },
  sm: { size: "0.875rem", lineHeight: "1.25rem" },
  base: { size: "1rem", lineHeight: "1.5rem" },
  lg: { size: "1.125rem", lineHeight: "1.75rem" },
  xl: { size: "1.25rem", lineHeight: "1.75rem" },
  "2xl": { size: "1.5rem", lineHeight: "2rem" },
  "3xl": { size: "1.875rem", lineHeight: "2.25rem" },
  "4xl": { size: "2.25rem", lineHeight: "2.5rem" },
  "5xl": { size: "3rem", lineHeight: "1.1" },
  "6xl": { size: "3.75rem", lineHeight: "1.05" },
}

export const displayScale: Record<string, { size: string; lineHeight: string }> = {
  "display-sm": { size: "clamp(1.75rem, 1.3rem + 1.8vw, 2.5rem)", lineHeight: "1.15" },
  "display-md": { size: "clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)", lineHeight: "1.1" },
  "display-lg": { size: "clamp(2.75rem, 1.8rem + 3.8vw, 4.75rem)", lineHeight: "1.02" },
}
