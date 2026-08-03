# Design guardrails

For everyone building on the Pinchblock design system: product people,
developers, and AI coding agents. These are the rules that keep the
product looking like one product. They are checkable; review against
them.

## The one law

Semantic tokens only. If a color, radius, font size, spacing, duration
or shadow is not a token, it does not go in. No hex/rgb/oklch literals in
feature code, no text-[13px], no rounded-[10px], no duration-[180ms].
If a token is missing, add the token (both light and dark values, every
theme compiles or it does not ship), then use it.

Why it is the one law: every knob this system promises (theme swap, dark
mode, radius, density, text size) works only because components resolve
through tokens at runtime. One hardcoded value is one element that
ignores the designer.

## Component rules

- Never rebuild a primitive. If Button, Dialog, Badge or Tabs does not
  do what you need, extend it in this repo; do not hand-roll a local
  variant in the app. App-local components that prove reusable graduate
  into this library, not into a shared/ folder in the app.
- Compose, do not configure. Prefer compound parts (Card.Header,
  Dialog.Footer) over boolean-prop explosions.
- Variants via CVA only; class merging via cn() only; state styling via
  data-* attributes, not JS style objects.
- Every new component: exported from src/index.ts, shown in a kitchen
  sink section, works in light AND dark in every theme, keyboard
  reachable, labelled for screen readers. Missing any of these means the
  component is not done.
- No cursor-pointer in components (the base layer handles it); drag
  handles set cursor-grab explicitly.
- No !important. No inline styles for anything a token can express.

## Visual rules (product decisions, not preferences)

- Glass (blur) is for PUBLIC marketing surfaces, headers, sheets and
  overlays only. Authenticated app cards stay solid. Light themes
  collapse glass to solid automatically; do not fight it.
- Status semantics are fixed: destructive reads red, success green,
  warning amber, in every theme. Themes may not repaint them into brand
  colors.
- The AI treatment (ai tokens + sparkle icon) marks every AI-assisted
  moment, and only AI-assisted moments.
- Soft tints (primary-soft, success-soft...) are for chips, badges and
  quiet emphasis; solid fills are for primary actions and status pills.
- Charts use chart tokens (chart-1..8, chart-positive/negative/target/
  track, feel-1..5). Never pick chart colors by hand.

## Motion rules

- Micro-interactions (hover, press, fade, accordion): CSS transitions
  with duration/ease tokens. duration-(--duration-fast) ease-(--ease-out)
  is the default pairing.
- Springs, layout moves, exit animations, gestures: Motion for React,
  with tokens for durations. Playful overshoot (--ease-spring) is for
  B2C reward moments (streaks, PRs, reactions), not for navigation.
- Everything respects prefers-reduced-motion. The base layer kills CSS
  animation globally; JS-driven animation must check it explicitly.
- Animation is seasoning, not structure: nothing may block interaction,
  and no loading state may spin forever without a fallback.

## For product people

- Specs reference components by name ("StatTile with trend", "Sheet with
  ConfirmDialog on discard"), not by appearance ("a rounded box with a
  shadow"). If the component does not exist, the spec names the gap; the
  system team decides build vs compose.
- The kitchen sink (demo/) is the source of truth for what exists and
  how it behaves in every theme. Review designs against it, not against
  screenshots of old builds.
- Empty, loading, error and offline states are part of every feature
  spec. The system provides EmptyState, Skeleton, Spinner, Alert; specs
  say which and with what copy.
- One new pattern per feature, maximum. If a feature needs three new
  components, the design is probably fighting the system.

## For AI coding agents

Reject your own output if any of these is true:

- a raw color/size/duration literal appears in a class string
- a primitive was re-implemented instead of imported from the barrel
- a component ships without a sink section or barrel export
- dark mode or an alternate theme was not considered (no dark:
  overrides needed if you stay on tokens; needing dark: is a smell)
- an interactive element cannot be reached or operated by keyboard
- cn() is missing and class strings are concatenated by hand

Source-of-truth order when in doubt: docs/ in this repo, then
src/styles/tokens.css (generated: read, never edit), then existing
primitives in src/components/ui, then the kitchen sink usage examples.
