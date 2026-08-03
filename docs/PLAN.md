# Pinchblock design system: plan

Status: foundation built, component build in progress. Updated 2026-08-03.

## Why this exists

pb-app has two forked visual languages today: web runs "Ocean Deep/Sage"
(navy + teal, CSS variables in globals.css, zero extracted components) and
mobile runs "Nocturne" (indigo + lilac, TS tokens, partially adopted). Root
AGENTS.md declares product UX and visual decisions provisional pending a
design-system finalization. This repo is that finalization vehicle: one
token contract, one component library, built in isolation, adopted app by
app when ready.

## Decisions (and why)

1. Standalone repo, owned source, no build step. Package ships raw TSX
   (types come free, no dist drift, Tailwind scans source). Consumers pin
   an immutable git tag, never a branch. Proven by trf-ui2 across 14 apps.
2. Base UI primitives (@base-ui/react), not Radix. shadcn's default since
   July 2026, actively developed by the ex-Radix team, and ships Toast,
   Drawer, Avatar, Combobox and OTP field which Radix never had.
3. Tokens authored in TypeScript, CSS generated and checked in
   (npm run gen). One typed source powers web CSS variables and React
   Native imports (@pinchblock/ui/tokens). The compiler enforces theme
   completeness; trf-ui2's 600 lines of hand-pasted theme blocks are the
   failure mode this avoids.
4. Themes are color-only CSS class blocks; swapping is one classList
   change, zero JS, zero re-render. .dark composes orthogonally. Status
   colors stay recognizable in every theme; destructive always reads red.
5. Four runtime knobs while the brand direction is open:
   - theme class (Ocean today; Nocturne and exploratory themes incoming)
   - .dark / light, with a no-flash boot script shipped by the package
   - --radius: one value reshapes every corner
   - --font-scale: whole type scale, rem-based so browser zoom survives
   - --density: scales every Tailwind spacing utility (paddings, gaps,
     control heights) via the --spacing derivation; trf-ui2 lacked this
6. B2C layers trf-ui2 never had, first-class here: motion tokens
   (durations/easings + Motion for React for springs/layout/exit),
   fluid display type scale, elevation tokens, glass vocabulary (public
   surfaces only), chart palette system (8 categorical + semantic
   positive/negative/target/track + feel-1..5 product scale), media
   components (video, aspect-ratio frames, upload).
7. Cross-platform strategy: tokens-only sharing. Web components are
   React DOM (they also cover the future desktop app); mobile keeps
   idiomatic RN components consuming the same tokens. No NativeWind
   (v5 still preview), no Tamagui (framework lock-in), no react-strict-dom
   (rewrite cost). Revisit NativeWind when 5.x is npm latest.
8. Kitchen sink is a Vite app in demo/, not Storybook: near-zero
   maintenance, exercises the real consumer wiring (file: install,
   @source scan), and doubles as the theme decision tool. Every component
   MUST have a sink section or it is incomplete.
9. Charts: Recharts 3 wrapper themed by system tokens. Motion: motion
   (Motion for React) + tw-animate-css utilities. Video: media-chrome
   wrapper now (R2/HLS ready), re-evaluate Video.js v10 at stable; Mux
   player if hosting lands on Mux. Brand animation: Rive recommended,
   app-level dependency, not a library dependency.

## Open decisions for the designer

- Icon set: web uses Lucide, mobile uses Phosphor (Nocturne handoff says
  regular-weight Phosphor). One set should win; recommendation is Lucide
  (already the web dependency, has an RN package, and is this library's
  peer dependency). Custom product icons (reactions, feel faces) stay a
  separate owned SVG set either way.
- Display font: --font-display currently equals Inter. If the B2C brand
  wants an expressive display face, it is a one-token change; the sink
  previews candidates.
- Which theme wins: run the sink, flip themes, decide. Ocean and Nocturne
  are faithful ports; ember and glacier are exploratory candidates.
- Feel-scale colors (feel-1..5) are provisional defaults, tune by eye.

## Phases

- [x] P0 Research: audits of pb-app web/mobile/product, trf-ui2 teardown,
      2026 ecosystem verification.
- [x] P1 Foundation: repo, typed tokens + generator, Ocean theme port,
      base/utilities CSS, theme runtime + boot script, Button exemplar,
      demo sink shell with live knobs.
- [ ] P2 Components: the starter set (see docs/COMPONENT-MAP.md for the
      full inventory-to-coverage mapping), each with a sink section.
      Themes: nocturne (faithful port), ember + glacier (exploratory).
- [ ] P3 Hardening: adversarial review, a11y pass (focus, ARIA, contrast),
      reduced-motion audit, docs complete, tag v0.1.0.
- [ ] P4 Adoption (in pb-app, separate effort): install by git tag, map
      old utilities to tokens (amber -> warning etc., see COMPONENT-MAP),
      replace hand-rolled primitives screen by screen, delete globals.css
      duplication. Mobile follows with tokens-first adoption.

## Consumption (when the time comes)

Web app CSS:

    @import "tailwindcss";
    @import "@pinchblock/ui/styles/index.css";
    @source "../node_modules/@pinchblock/ui/src";
    @custom-variant dark (&:where(.dark, .dark *));

plus the no-flash boot script in the document head (themeBootScript) and
InterVariable loaded by the app (@fontsource-variable/inter or next/font;
note: pb-app web declares Inter today but never loads it, so most users
see Arial; adoption fixes that bug for free).

React Native:

    import { themes, shared } from "@pinchblock/ui/tokens"

Versioning: sequential tags v0.x.y; consumers pin tags. No main-branch
pins ever.
