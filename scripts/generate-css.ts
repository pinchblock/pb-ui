/**
 * Generates src/styles/tokens.css from the TypeScript token source.
 *
 *   npm run gen          rewrite tokens.css
 *   npm run gen:check    fail if tokens.css is stale (CI guard)
 *
 * Design: themes are TS data (typed, deduplicated, RN-consumable);
 * CSS is a build artifact that is checked in so consumers need no
 * build step. Node 22.6+ runs this file directly (type stripping).
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { themes, shared, textScale, displayScale } from "../src/tokens/index.ts"
import type { ModeTokens } from "../src/tokens/types.ts"

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "styles", "tokens.css")

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Za-z])(\d)/g, "$1-$2").toLowerCase()

/** ModeTokens key -> CSS custom property name. */
const cssVar = (key: string) => `--${kebab(key)}`

function modeBlock(tokens: ModeTokens, indent = "  "): string {
  return (Object.entries(tokens) as [string, string][])
    .map(([k, v]) => `${indent}${cssVar(k)}: ${v};`)
    .join("\n")
}

function build(): string {
  const def = themes[0]
  if (!def) throw new Error("No themes registered in src/tokens/index.ts")
  const alternates = themes.slice(1)

  const lines: string[] = []
  lines.push(`/*`)
  lines.push(` * GENERATED FILE - do not edit by hand.`)
  lines.push(` * Source: src/tokens/*.ts   Regenerate: npm run gen`)
  lines.push(` *`)
  lines.push(` * Import order in a consumer app:`)
  lines.push(` *   @import "tailwindcss";`)
  lines.push(` *   @import "@pinchblock/ui/styles/index.css";  (or tokens.css alone)`)
  lines.push(` *   @custom-variant dark (&:where(.dark, .dark *));`)
  lines.push(` *`)
  lines.push(` * Runtime knobs (set on <html> via JS or a theme class):`)
  lines.push(` *   --radius       one value reshapes every corner (default ${shared.radius})`)
  lines.push(` *   --font-scale   multiplies the whole type scale (default ${shared.fontScale})`)
  lines.push(` *   --density      multiplies spacing, paddings, control sizes (default ${shared.density})`)
  lines.push(` *   .theme-<id>    color theme class; .dark composes orthogonally`)
  lines.push(` */`)
  lines.push(``)

  /* Default theme, light mode, plus shared knobs on :root. */
  lines.push(`:root {`)
  lines.push(`  color-scheme: light;`)
  lines.push(``)
  lines.push(`  --radius: ${shared.radius};`)
  lines.push(`  --font-scale: ${shared.fontScale};`)
  lines.push(`  --density: ${shared.density};`)
  lines.push(`  /* Scales every Tailwind spacing utility (p-*, gap-*, h-*, size-*). */`)
  lines.push(`  --spacing: calc(0.25rem * var(--density));`)
  lines.push(``)
  lines.push(`  --font-sans: ${shared.fontSans};`)
  lines.push(`  --font-display: ${shared.fontDisplay};`)
  lines.push(`  --font-mono: ${shared.fontMono};`)
  lines.push(``)
  for (const [k, v] of Object.entries(shared.motion.duration)) lines.push(`  --duration-${k}: ${v};`)
  for (const [k, v] of Object.entries(shared.motion.ease)) lines.push(`  --ease-${kebab(k)}: ${v};`)
  lines.push(``)
  lines.push(modeBlock(def.light))
  lines.push(`}`)
  lines.push(``)
  lines.push(`.dark {`)
  lines.push(`  color-scheme: dark;`)
  lines.push(``)
  lines.push(modeBlock(def.dark))
  lines.push(`}`)

  /* Alternate themes: color-only overrides. Cascade does the work:
     .theme-x (one class) beats :root; .theme-x.dark (two) beats .dark. */
  for (const t of alternates) {
    lines.push(``)
    lines.push(`/* ${t.label}: ${t.description} */`)
    lines.push(`.theme-${t.id} {`)
    lines.push(`  color-scheme: light;`)
    lines.push(``)
    lines.push(modeBlock(t.light))
    lines.push(`}`)
    lines.push(``)
    lines.push(`.theme-${t.id}.dark,`)
    lines.push(`.theme-${t.id} .dark {`)
    lines.push(`  color-scheme: dark;`)
    lines.push(``)
    lines.push(modeBlock(t.dark))
    lines.push(`}`)
  }

  /* Tailwind v4 mapping: utilities resolve through var(--x) at runtime,
     so theme/mode/knob changes restyle everything with zero JS. */
  lines.push(``)
  lines.push(`@theme inline {`)
  lines.push(`  --font-sans: var(--font-sans);`)
  lines.push(`  --font-display: var(--font-display);`)
  lines.push(`  --font-mono: var(--font-mono);`)
  lines.push(``)
  lines.push(`  /* Corner scale derived from the single --radius knob. */`)
  lines.push(`  --radius-xs: max(2px, calc(var(--radius) - 6px));`)
  lines.push(`  --radius-sm: max(2px, calc(var(--radius) - 4px));`)
  lines.push(`  --radius-md: max(3px, calc(var(--radius) - 2px));`)
  lines.push(`  --radius-lg: var(--radius);`)
  lines.push(`  --radius-xl: calc(var(--radius) + 4px);`)
  lines.push(`  --radius-2xl: calc(var(--radius) + 8px);`)
  lines.push(`  --radius-3xl: calc(var(--radius) + 16px);`)
  lines.push(``)
  lines.push(`  /* Motion: ease-out / ease-in-out / ease-spring utilities. */`)
  for (const k of Object.keys(shared.motion.ease)) {
    lines.push(`  --ease-${kebab(k)}: var(--ease-${kebab(k)});`)
  }
  lines.push(``)
  lines.push(`  /* Type scale x --font-scale (rem-based: browser zoom intact). */`)
  for (const [name, t] of Object.entries(textScale)) {
    lines.push(`  --text-${name}: calc(${t.size} * var(--font-scale));`)
    const lh = t.lineHeight.endsWith("rem")
      ? `calc(${t.lineHeight} * var(--font-scale))`
      : t.lineHeight
    lines.push(`  --text-${name}--line-height: ${lh};`)
  }
  for (const [name, t] of Object.entries(displayScale)) {
    lines.push(`  --text-${name}: calc(${t.size} * var(--font-scale));`)
    lines.push(`  --text-${name}--line-height: ${t.lineHeight};`)
  }
  lines.push(``)
  lines.push(`  /* Semantic colors -> utilities (bg-card, text-muted-foreground...). */`)
  const NOT_A_COLOR = new Set(["glassFilter"])
  const sample = def.light
  for (const key of Object.keys(sample)) {
    if (NOT_A_COLOR.has(key)) continue
    const v = cssVar(key)
    if (key.startsWith("shadow")) {
      lines.push(`  --shadow-${kebab(key.slice("shadow".length))}: var(${v});`)
    } else {
      lines.push(`  --color-${kebab(key)}: var(${v});`)
    }
  }
  lines.push(`}`)
  lines.push(``)
  return lines.join("\n")
}

const css = build()
const check = process.argv.includes("--check")
if (check) {
  let current = ""
  try {
    current = readFileSync(OUT, "utf8")
  } catch {
    /* missing counts as stale */
  }
  if (current !== css) {
    console.error("src/styles/tokens.css is stale. Run: npm run gen")
    process.exit(1)
  }
  console.log("tokens.css is up to date")
} else {
  writeFileSync(OUT, css)
  console.log(`Wrote ${OUT}`)
}
