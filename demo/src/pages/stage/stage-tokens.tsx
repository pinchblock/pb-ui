import { themes } from "@pinchblock/ui"
import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/**
 * Stage tokens: the always-dark, theme-invariant surface set for
 * immersive full-screen moments (src/tokens/stage.ts). The matrix
 * below wraps the same .stage panel in every theme, both modes, to
 * prove nothing leaks in.
 */

const STAGE_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Surfaces",
    keys: ["background", "background-raised", "background-sunken", "card", "muted"],
  },
  {
    label: "Text",
    keys: ["foreground", "muted-foreground", "faint-foreground"],
  },
  {
    label: "Accent (neutral steel, deliberately no brand hue)",
    keys: ["primary", "primary-soft", "secondary", "accent"],
  },
  {
    label: "Status (work / caution / stop / rest)",
    keys: ["success", "warning", "destructive", "info"],
  },
  {
    label: "Chrome",
    keys: ["border", "border-strong", "ring", "chart-track"],
  },
]

/* Dynamic var() lookup is the one place style={} is right: Tailwind
 * cannot see class names built from data (same as foundations/colors). */
function StageSwatchGrid() {
  return (
    <div className="space-y-6">
      {STAGE_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="eyebrow mb-2">{group.label}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {group.keys.map((key) => (
              <div key={key} className="rounded-md border border-border p-2">
                <div
                  className="mb-2 h-10 rounded-sm border border-border/50"
                  style={{ background: `var(--${key})` }}
                />
                <p className="truncate font-mono text-xs text-muted-foreground">--{key}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** The identical specimen dropped into every theme/mode cell. */
function StageSpecimen() {
  return (
    <div className="stage rounded-lg bg-background p-3 text-foreground">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold tracking-widest text-success uppercase">
          Work
        </span>
        <span className="font-display text-2xl font-semibold tabular-nums">01:37</span>
        <span className="flex gap-1">
          <i className="size-3 rounded-full bg-success" />
          <i className="size-3 rounded-full bg-info" />
          <i className="size-3 rounded-full bg-warning" />
          <i className="size-3 rounded-full bg-destructive" />
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Same pixels in every cell: stage tokens are set on the element itself.
      </p>
    </div>
  )
}

/** One theme card, light and dark, each hosting the stage specimen. */
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
          <StageSpecimen />
        </div>
      ))}
    </div>
  )
}

export default function StageTokensPage() {
  return (
    <div>
      <PageIntro
        title="Stage tokens"
        description="The always-dark, theme-invariant token set for immersive full-screen moments: workout timers, call screens. Wrapping a subtree in class 'stage' redefines every token variable on that element, so no theme or mode on the root can leak in."
        use="Reach for stage when a surface must look identical for every user in every theme: OLED near-black, high-contrast text for arm's-length legibility, status hues tuned brighter for near-black. The accent is a neutral steel on purpose, so stage never reads as one theme's brand."
      />

      <Showcase
        title="Stage palette"
        hint="Rendered inside a .stage panel; the theme and mode pickers in the top bar change nothing here. That is the point."
      >
        <div className="stage rounded-xl bg-background p-4">
          <StageSwatchGrid />
        </div>
      </Showcase>

      <Showcase
        title="Invariance matrix"
        hint="Every theme, both modes, hosting the same stage specimen. The frame changes; the stage panel never does."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {themes.map((t) => (
            <ThemeCell key={t.id} id={t.id} label={t.label} />
          ))}
        </div>
      </Showcase>

      <CodeBlock
        code={`
<!-- Wrap the immersive subtree; everything inside resolves to stage tokens -->
<div class="stage">
  <FullScreenTimer ... />
</div>

/* Components built for stage (FullScreenTimer) apply the class
   themselves; inside it, normal utilities just work: */
<span className="bg-success-soft text-success">Work</span>

/* Token source of truth: src/tokens/stage.ts; the compiler enforces
   the same completeness as a theme mode. Never edit tokens.css. */
`}
      />
    </div>
  )
}
