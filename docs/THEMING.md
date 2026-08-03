# Theming and the global knobs

Everything here works at runtime with zero JS re-render: Tailwind
utilities resolve through CSS variables, so changing a class or a
variable on <html> restyles the whole page instantly.

## The knobs

| Knob | Mechanism | Runtime helper |
| --- | --- | --- |
| Color theme | .theme-<id> class on <html> (default theme = no class) | applyTheme("nocturne") |
| Light/dark | .dark class on <html>, orthogonal to theme | applyMode("dark" \| "light" \| "system") |
| Corner radius | --radius variable; whole rounded-* scale derives from it | setRadius(14) |
| Text size | --font-scale multiplies the rem type scale | setFontScale(1.15) |
| Density | --density multiplies --spacing, so every padding, gap and control height scales | setDensity(0.9) |

Persistence: helpers write localStorage (pb-ui.theme / pb-ui.mode); the
themeBootScript export applies both before first paint (no flash).

## How themes work

A theme is a TypeScript object in src/tokens/themes/ providing every
semantic token for light AND dark (the ModeTokens type enforces
completeness). `npm run gen` writes them into src/styles/tokens.css as
class blocks:

    :root { ...ocean light... }
    .dark { ...ocean dark... }
    .theme-nocturne { ...nocturne light... }
    .theme-nocturne.dark { ...nocturne dark... }

Cascade does the composition: .theme-x (one class) beats :root, and
.theme-x.dark (two classes) beats .dark. No !important anywhere.
Scoped previews work by wrapping any subtree in the theme class; the
sink's theme matrix uses exactly that.

## Adding a theme

1. Copy src/tokens/themes/ocean.ts, rename, adjust values. Rules:
   status colors stay recognizable (destructive red, success green,
   warning amber); popovers sit visually above cards in dark mode;
   soft tints stay quiet at roughly 12-16% strength.
2. Register it in src/tokens/index.ts (themes array).
3. `npm run gen`, then check the sink: theme matrix section plus a walk
   through every component group in both modes.

Themes are color-only. Radius, type, density and motion do not belong
to a theme; they are separate knobs by design, so a theme decision and
a shape decision can be made independently.

## What themes must not touch

- Status semantics (see docs/GUARDRAILS.md)
- --radius / --font-scale / --density defaults
- Font families (a font change is a shared-token change, one line in
  src/tokens/shared.ts)
