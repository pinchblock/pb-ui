import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/** Token keys shown in the grids, grouped for scanning. */
const CORE_GROUPS: { label: string; keys: string[] }[] = [
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
]

const DATA_GROUPS: { label: string; keys: string[] }[] = [
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

/* Dynamic var() lookup is the one place style={} is right: Tailwind
 * cannot see class names built from data. */
function SwatchGrid({ groups }: { groups: { label: string; keys: string[] }[] }) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="eyebrow mb-2">{group.label}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
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

export default function ColorsPage() {
  return (
    <div>
      <PageIntro
        title="Colors"
        description="Every color in the product resolves through these semantic tokens at runtime. Swap theme or mode in the top bar: every swatch on this page is live."
        use="Reference tokens through Tailwind utilities (bg-card, text-muted-foreground, border-border). Never write a hex, rgb or oklch literal in feature code; if a color is missing, add the token in src/tokens first, for every theme, both modes."
      />

      <Showcase
        title="Semantic palette"
        hint="Named by role, not by hue. Status semantics are fixed across themes: destructive reads red, success green, warning amber."
      >
        <SwatchGrid groups={CORE_GROUPS} />
      </Showcase>

      <Showcase
        title="Data colors"
        hint="Charts never pick colors by hand: series take chart-1..8 in order, outcomes take positive/negative, session feel takes the feel scale."
      >
        <SwatchGrid groups={DATA_GROUPS} />
      </Showcase>

      <CodeBlock
        code={`
/* Tailwind utilities are generated straight from the tokens: */
<div className="rounded-xl border border-border bg-card text-card-foreground">
<span className="rounded-full bg-primary-soft px-2 text-primary">New PR</span>

/* Raw var() only where utilities cannot reach (chart libs, canvas): */
.sparkline { stroke: var(--chart-1); }

/* React Native and scripts read the TypeScript source of truth: */
import { themes, shared } from "@pinchblock/ui/tokens"
`}
      />
    </div>
  )
}
