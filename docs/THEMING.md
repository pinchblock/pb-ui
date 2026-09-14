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

## Stage

Stage is the always-dark surface set for immersive full-screen moments:
workout timers, call screens, anything meant to fill the display and
stay legible at arm's length. It is not a theme and is never registered
in the themes array; it is a single token set (src/tokens/stage.ts,
typed as ModeTokens so completeness is compiler-enforced).

The guarantee: a stage subtree looks identical in every theme and in
light or dark mode, the same way status colors are fixed across themes.
It works because `npm run gen` emits one .stage block that sets every
token variable on the .stage element itself; custom properties inherit
from the nearest ancestor that defines them, so those values beat
whatever .theme-x / .dark set on <html>, with no specificity tricks.

Usage: wrap the subtree, then use normal token utilities inside.

    <div className="stage">
      ...bg-background, text-foreground, bg-success and every other
      token utility now resolve to the stage palette...
    </div>

Palette notes: OLED near-black background, barely lifted cards, bright
status hues (success green for work states, destructive red for
end-call and rest warnings, warning amber for caution), and a
neutral-cool steel primary that deliberately carries no theme's brand
color. Available from TS as `import { stage } from "@pinchblock/ui/tokens"`.

## Marquee

Marquee is the second fixed surface set, for the public landing page.
Same mechanism and guarantee as stage (one .marquee block, every token
set on the element itself, identical in every theme and mode), but it
carries the brand where stage deliberately does not: near-black ground,
warm off-white ink, the app icon's accent as primary, and its own
display face.

Two things are particular to it:

- The brand accent is ONE constant, `BRAND`, at the top of
  src/tokens/marquee.ts. primary, primary-hover, primary-soft,
  primary-border and ring derive from it. Recolouring the icon later
  means changing that line and running `npm run gen`.
- It overrides --font-display inside the block through a hook,
  `--font-marquee-display`, that the consumer fills with the loaded
  face (next/font's `variable` on the wrapper). The stack falls back
  to the shared sans, so an unloaded font never means an unstyled
  headline. The shared --font-display default is untouched: nothing
  outside .marquee changes.

Usage: wrap the landing subtree, supply the font variable, use normal
token utilities inside. Sink: Stage group, "Marquee tokens".

## Turquoise

Turquoise is the landing palette as an app theme, so a visitor who
signs in from the landing lands in an app that continues it. Its dark
mode spreads marquee and overrides the surface and border slots (see
DECISIONS.md, 2026-09-09) in src/tokens/themes/turquoise.ts,
token for token, no copy. That keeps one source for the brand colour
(the `BRAND` constant above reaches the theme too) and means the two
can never drift. Light mode keeps the same near-black ink on warm
paper; the icon cyan cannot carry text on paper (1.3:1), so light's
primary is the same hue pulled down to a deep teal (#077683, 4.8:1 on
the page, 5.4:1 with white on it). Status, AI and chart hues follow
the other themes' light tuning. It is registered like any theme
(`.theme-turquoise`), not the default.

## What themes must not touch

- Status semantics (see docs/GUARDRAILS.md)
- --radius / --font-scale / --density defaults
- Font families (a font change is a shared-token change, one line in
  src/tokens/shared.ts)
