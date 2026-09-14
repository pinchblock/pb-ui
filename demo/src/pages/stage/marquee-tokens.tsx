import { themes } from "@pinchblock/ui"
import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/**
 * Marquee tokens: the always-dark, theme-invariant surface set for the
 * public landing (src/tokens/marquee.ts). Same proof as the stage page:
 * the identical specimen dropped into every theme and mode.
 */

const ARCHIVO =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap"

const MARQUEE_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Surfaces",
    keys: ["background", "background-raised", "card", "popover", "muted"],
  },
  {
    label: "Text",
    keys: ["foreground", "muted-foreground", "faint-foreground"],
  },
  {
    label: "Brand (one constant in marquee.ts; everything here derives from it)",
    keys: ["primary", "primary-hover", "primary-soft", "primary-border", "accent"],
  },
  {
    label: "Status (unchanged from stage, never the brand hue)",
    keys: ["success", "warning", "destructive", "info"],
  },
  {
    label: "Chrome and glass",
    keys: ["border", "border-strong", "ring", "glass-bg", "glass-border"],
  },
]

/* Dynamic var() lookup is the one place style={} is right: Tailwind
 * cannot see class names built from data (same as foundations/colors). */
function MarqueeSwatchGrid() {
  return (
    <div className="space-y-6">
      {MARQUEE_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="eyebrow mb-2">{group.label}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {group.keys.map((key) => (
              <div key={key} className="rounded-md border border-border p-2">
                <div
                  className="mb-2 h-10 rounded-sm border border-border/50"
                  style={{ background: `var(--${key})` }}
                />
                <p className="truncate font-mono text-xs text-muted-foreground">
                  --{key}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * The identical specimen dropped into every theme/mode cell: the
 * landing's fold in miniature. The wrapper supplies the display face
 * through the hook the app will fill with next/font; here it is the
 * Google Fonts Archivo loaded by <ArchivoLink />.
 */
function MarqueeSpecimen() {
  return (
    <div
      className="marquee rounded-lg bg-background p-4 text-foreground"
      style={{ ["--font-marquee-display" as string]: "Archivo" }}
    >
      <p className="mb-2 font-mono text-xs tracking-wide text-faint-foreground">
        01 Strength
      </p>
      <h3 className="font-display text-3xl leading-none font-bold tracking-tight font-stretch-semi-expanded">
        Real pro coaches for athletes who aren&apos;t pro.{" "}
        <span className="text-primary">Yet.</span>
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Find your coach
        </span>
        <span className="rounded-full border border-border-strong px-4 py-2 text-sm font-semibold">
          Apply as a coach
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Same pixels in every cell: marquee tokens are set on the element itself.
      </p>
    </div>
  )
}

/** One theme card, light and dark, each hosting the marquee specimen. */
function ThemeCell({ id, label }: { id: string; label: string }) {
  return (
    <div className={`theme-${id} rounded-lg border border-border`}>
      {(["light", "dark"] as const).map((mode) => (
        <div
          key={mode}
          className={`${mode === "dark" ? "dark rounded-b-lg" : "rounded-t-lg"} bg-background p-3`}
        >
          <p className="mb-2 text-xs font-semibold text-foreground">
            {label} {mode}
          </p>
          <MarqueeSpecimen />
        </div>
      ))}
    </div>
  )
}

export default function MarqueeTokensPage() {
  return (
    <div>
      <link rel="stylesheet" precedence="default" href={ARCHIVO} />
      <PageIntro
        title="Marquee tokens"
        description="The always-dark, theme-invariant token set for the public landing page. Wrapping a subtree in class 'marquee' redefines every token variable on that element, so no theme or mode on the root can leak in, and the display face switches to Archivo through --font-marquee-display."
        use="Reach for marquee on public marketing surfaces only. The brand accent is one constant in src/tokens/marquee.ts; primary, hover, soft, border, ring and the landing mesh all derive from it, so an icon recolour is a one-line change plus `npm run gen`. Product screens keep their theme; stage keeps its neutral steel."
      />

      <Showcase
        title="Marquee palette"
        hint="Rendered inside a .marquee panel; the theme and mode pickers in the top bar change nothing here."
      >
        <div className="marquee rounded-xl bg-background p-4">
          <MarqueeSwatchGrid />
        </div>
      </Showcase>

      <Showcase
        title="Invariance matrix"
        hint="Every theme, both modes, hosting the same fold-in-miniature. The frame changes; the marquee panel never does."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {themes.map((t) => (
            <ThemeCell key={t.id} id={t.id} label={t.label} />
          ))}
        </div>
      </Showcase>

      <CodeBlock
        code={`
/* Next.js: load the display face once, in the landing route, and hand
   it to the token set through the hook it declares. */
import { Archivo } from "next/font/google"
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-marquee-display",
  display: "swap",
})

<div className={\`marquee \${archivo.variable}\`}>
  {/* every utility inside resolves to marquee tokens; headings and
      font-display use Archivo, everything else stays on the sans */}
  <h1 className="font-display font-bold tracking-tight">...</h1>
  <a className="rounded-full bg-primary text-primary-foreground">Find your coach</a>
</div>

/* The brand accent lives in ONE place: src/tokens/marquee.ts, const BRAND.
   Swap it, run npm run gen, bump the tag. Never edit tokens.css. */
`}
      />
    </div>
  )
}
