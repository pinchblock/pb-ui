# @pinchblock/ui repo guide

Design system and component library for Pinchblock (B2C training
platform). Owned source, no build step, consumed as a git-tag pin.

Rules, in order:

1. Read docs/GUARDRAILS.md before writing any component code. It
   contains the reject-list your output is reviewed against.
2. src/tokens/ (TypeScript) is the single source of truth for every
   color, shadow, motion and scale value. src/styles/tokens.css is
   GENERATED: never edit it, run `npm run gen` after token changes.
   Every theme must provide every token (the compiler enforces it).
3. Components live in src/components/ui (primitives) and
   src/components (composed). Follow the Button exemplar
   (src/components/ui/button.tsx): Base UI primitive underneath, CVA
   variants, cn() merging, semantic tokens only, motion via tokens.
4. Every component must be exported from src/index.ts AND have a
   kitchen sink section (demo/src/sections/). No sink section = not
   done.
5. Components must work in light and dark in EVERY theme without dark:
   overrides. Needing dark: means a token is missing; add the token.
6. Icons: @phosphor-icons/react only (peer dependency). Never set a
   weight on individual icons in library code; the consumer's
   IconContext controls weight globally (regular default, fill for
   active states where the design calls for it).
7. KISS: no new build steps, no new dependencies without strong
   justification, no thin wrapper components, no app-domain logic in
   this package (no API clients, no auth, no permissions).
8. Verify: `npm test` (token freshness + typecheck) and the demo
   (`npm run dev`, port 5190) before calling anything complete.

Release: tag vX.Y.Z on main; consumers pin tags, never main
(docs/CONSUMING.md).
