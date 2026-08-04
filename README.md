# @pinchblock/ui

Pinchblock's design system: typed tokens, themeable component library,
and a kitchen sink to drive design decisions. Owned source (shadcn
style) on Base UI + Tailwind v4. No build step; consumers compile the
TSX themselves.

## Quickstart

    npm install          # library deps
    npm run demo:install # kitchen sink deps
    npm run dev          # kitchen sink at http://localhost:5190

The sink's top bar is the design cockpit: theme, light/dark, corner
radius, text size, density and icon weight, all live, no reload.
Every component has its own page at /c/<group>/<component>; URL
params (?theme=&mode=&radius=&density=&font=&icons=) pin an exact
configuration for links and screenshots.

## Layout

    src/tokens/       typed token source (themes, motion, scales)
    src/styles/       tokens.css (GENERATED: npm run gen) + base + utilities
    src/components/   ui/ primitives and composed components
    src/lib/          cn(), theme runtime, no-flash boot script
    demo/             kitchen sink (Vite)
    docs/             PLAN, GUARDRAILS, THEMING, COMPONENT-MAP, CONSUMING

## Everyday commands

    npm run gen        regenerate tokens.css after editing src/tokens
    npm test           token freshness check + typecheck
    npm run dev        kitchen sink

Read docs/GUARDRAILS.md before contributing. Every component needs a
barrel export and its own kitchen sink page, and must hold up in every
theme, light and dark.
