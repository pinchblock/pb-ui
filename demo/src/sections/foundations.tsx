import { shared, themes } from "@pinchblock/ui"
import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

/** Token keys shown in the color grid, grouped for scanning. */
const COLOR_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Surfaces",
    keys: [
      "background",
      "background-raised",
      "background-sunken",
      "card",
      "popover",
      "muted",
    ],
  },
  {
    label: "Text",
    keys: ["foreground", "muted-foreground", "faint-foreground"],
  },
  {
    label: "Brand",
    keys: ["primary", "primary-hover", "primary-soft", "secondary", "accent"],
  },
  {
    label: "Status",
    keys: [
      "success",
      "success-soft",
      "warning",
      "warning-soft",
      "destructive",
      "destructive-soft",
      "info",
      "info-soft",
      "ai",
      "ai-foreground",
    ],
  },
  {
    label: "Chrome",
    keys: ["border", "border-strong", "input", "input-background", "ring", "overlay"],
  },
  {
    label: "Charts",
    keys: [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-7",
      "chart-8",
      "chart-positive",
      "chart-negative",
      "chart-target",
      "chart-track",
    ],
  },
  {
    label: "Feel scale (1 rough to 5 great)",
    keys: ["feel-1", "feel-2", "feel-3", "feel-4", "feel-5"],
  },
]

function ColorGrid() {
  return (
    <div className="space-y-6">
      {COLOR_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="eyebrow mb-2">{group.label}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {group.keys.map((key) => (
              <div key={key} className="rounded-md border border-border p-2">
                <div
                  className="mb-2 h-10 rounded-sm border border-border/50"
                  style={{ background: `var(--${key})` }}
                />
                <p className="truncate font-mono text-[11px] text-muted-foreground">--{key}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TypeScale() {
  /* Literal classes: Tailwind cannot see dynamically built class names. */
  const sizes: [string, string][] = [
    ["xs", "text-xs"],
    ["sm", "text-sm"],
    ["base", "text-base"],
    ["lg", "text-lg"],
    ["xl", "text-xl"],
    ["2xl", "text-2xl"],
    ["3xl", "text-3xl"],
    ["4xl", "text-4xl"],
  ]
  return (
    <div className="space-y-3">
      {sizes.map(([name, cls]) => (
        <div key={name} className="flex items-baseline gap-4">
          <span className="w-16 shrink-0 font-mono text-xs text-faint-foreground">text-{name}</span>
          <span className={`${cls} truncate text-foreground`}>Train hard, recover harder</span>
        </div>
      ))}
      <div className="mt-6 space-y-4 border-t border-border pt-6">
        <p className="eyebrow">Display (fluid, marketing surfaces)</p>
        <p className="text-display-sm font-display">Coaching that adapts</p>
        <p className="text-display-md font-display">Send your project</p>
        <p className="text-display-lg font-display text-gradient-primary">Pinchblock</p>
      </div>
    </div>
  )
}

function MotionTokens() {
  return (
    <div className="space-y-4">
      <VariantRow>
        {Object.entries(shared.motion.duration).map(([name, value]) => (
          <div key={name} className="group rounded-md border border-border px-4 py-3">
            <div
              className="mb-2 h-2 w-8 rounded-full bg-primary transition-transform group-hover:translate-x-16"
              style={{ transitionDuration: value, transitionTimingFunction: "var(--ease-out)" }}
            />
            <p className="font-mono text-[11px] text-muted-foreground">
              --duration-{name} {value}
            </p>
          </div>
        ))}
      </VariantRow>
      <p className="text-xs text-muted-foreground">
        Hover a tile to preview. Easings: --ease-out (entrances), --ease-in-out (moves),
        --ease-spring (playful overshoot). Respect prefers-reduced-motion: the base layer
        disables everything automatically.
      </p>
    </div>
  )
}

function ThemeMatrix() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {themes.map((t) => (
        <div key={t.id} className={`theme-${t.id} rounded-lg border border-border`}>
          {(["light", "dark"] as const).map((mode) => (
            <div
              key={mode}
              className={`${mode === "dark" ? "dark rounded-b-lg" : "rounded-t-lg"} bg-background p-4`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {t.label} {mode}
                </span>
                <span className="flex gap-1">
                  <i className="size-4 rounded-full bg-primary" />
                  <i className="size-4 rounded-full bg-success" />
                  <i className="size-4 rounded-full bg-warning" />
                  <i className="size-4 rounded-full bg-destructive" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  Primary
                </span>
                <span className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-card-foreground">
                  Card
                </span>
                <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs text-primary">
                  Soft chip
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const sections: SinkSection[] = [
  {
    id: "colors",
    label: "Colors",
    render: () => (
      <Showcase
        title="Semantic color tokens"
        hint="Components only ever reference these. Swap theme or mode above: every swatch is live."
      >
        <ColorGrid />
      </Showcase>
    ),
  },
  {
    id: "typography",
    label: "Typography",
    render: () => (
      <Showcase
        title="Type scale"
        hint="All sizes multiply by --font-scale (S/M/L control above). Display sizes are fluid via clamp()."
      >
        <TypeScale />
      </Showcase>
    ),
  },
  {
    id: "motion-tokens",
    label: "Motion",
    render: () => (
      <Showcase
        title="Motion tokens"
        hint="Durations and easings are tokens like colors. Components use duration-(--duration-fast) ease-(--ease-out)."
      >
        <MotionTokens />
      </Showcase>
    ),
  },
  {
    id: "themes",
    label: "Themes side by side",
    render: () => (
      <Showcase
        title="Every theme, both modes, at once"
        hint="Themes are pure CSS class blocks; wrapping any subtree in .theme-x re-themes just that subtree."
      >
        <ThemeMatrix />
      </Showcase>
    ),
  },
]
