# Consuming @pinchblock/ui

## Install (when adoption starts)

Pin an immutable tag; never a branch:

    npm i github:pinchblock/pb-ui#v0.1.0

(or "file:../pb-ui" for local side-by-side development.)

Peer deps the app must own: react ^19, react-dom ^19, lucide-react,
tailwindcss ^4.

## Web wiring (Next.js)

next.config.ts: the package ships raw TypeScript, so Next must compile
it:

    transpilePackages: ["@pinchblock/ui"]

app CSS:

    @import "tailwindcss";
    @import "@pinchblock/ui/styles/index.css";
    @source "../node_modules/@pinchblock/ui/src";
    @custom-variant dark (&:where(.dark, .dark *));

Document head, before paint. Import from the theme-boot subpath, NOT
the barrel: the subpath is server-safe, while the barrel pulls in
client component modules:

    import { themeBootScript } from "@pinchblock/ui/theme-boot"
    <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />

Fonts: load InterVariable in the app (next/font or
@fontsource-variable/inter). The tokens only name the family.

Then: import { Button } from "@pinchblock/ui".

### App Router / RSC boundaries

Every interactive module carries "use client", so components imported
from "@pinchblock/ui" work from server components (Next lifts them
into the client bundle automatically once transpilePackages is set).
Two subpaths are deliberately directive-free and safe to use inside
server components: "@pinchblock/ui/tokens" (theme data) and
"@pinchblock/ui/theme-boot" (the boot script string).

## React Native (Expo)

    import { themes, shared, defaultTheme } from "@pinchblock/ui/tokens"

Metro compiles the TS directly. Build the RN theme provider on these
objects; the semantic names match the web CSS variables one to one
(background, card, primarysoft -> primarySoft etc.), so design
conversations use one vocabulary.

## Migration vocabulary (pb-app web globals.css -> system)

| Old | New |
| --- | --- |
| --amber / bg-amber-soft | --warning / bg-warning-soft |
| --text-secondary | --muted-foreground / text-muted-foreground |
| --text-muted | --faint-foreground / text-faint-foreground |
| --surface | --background-raised (or bg-card where it meant card) |
| --input-bg | --input-background |
| --ai-bg / --ai-fg | --ai / --ai-foreground |
| --sidebar* | tokens dropped; NavRail styles itself from core tokens |
| glass-input utility | Input component (glass handled by tokens) |
| .light / [data-theme="light"] | absence of .dark |
| localStorage "pinchblock-theme" | pb-ui.theme + pb-ui.mode keys |

Radius note: the old scale was fixed px (4/6/10/14). The new scale
derives from --radius (default 0.625rem = 10px): rounded-lg matches the
old card radius; rounded-sm (~6px at default) replaces the old
--radius-md; audit rounded-sm buttons visually when migrating.

## For app-side AI agents

Paste into the consuming repo's AGENTS.md:

    UI comes from @pinchblock/ui (node_modules/@pinchblock/ui). Read
    its docs/GUARDRAILS.md and docs/THEMING.md before UI work. Never
    hand-roll a primitive that exists in its barrel (src/index.ts);
    never hardcode colors/radii/sizes; semantic Tailwind tokens only.
