import { Flame } from "@phosphor-icons/react"

import { cn, Sparkline } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const CLIENTS = [
  { name: "Mari K.", plan: "Hypertrophy, week 6", streak: 12, data: [3, 4, 3, 5, 4, 5, 6, 7], delta: "+18%" },
  { name: "Tom R.", plan: "5k prep, week 3", streak: 2, data: [5, 4, 4, 3, 3, 2, 2, 1], delta: "-24%" },
  { name: "Katrin V.", plan: "Strength base, week 9", streak: 21, data: [4, 4, 5, 4, 5, 5, 5, 6], delta: "+9%" },
  { name: "Jaan P.", plan: "Return from injury", streak: 5, data: [1, 2, 2, 3, 2, 3, 4, 4], delta: "+31%" },
]

export default function SparklinePage() {
  return (
    <div>
      <PageIntro
        title="Sparkline"
        description="A tiny inline trend line. Pure SVG, no recharts: cheap enough to render one per row in long lists."
        use="Use in list rows, tables and stat tiles where the shape of the trend matters more than the values. No axes, no tooltip; if the reader needs numbers, use TrendChart or a full Chart instead."
      />

      <Showcase
        title="Variants"
        hint="tone='auto' reads direction from the data: rising trends render positive, falling ones negative. Custom strokes take chart tokens only."
      >
        <VariantRow>
          <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} label="Default" />
          <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} smooth={false} label="Not smoothed" />
          <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} gradient label="Gradient fill" />
          <Sparkline data={[2, 3, 3, 4, 5, 5, 6, 7]} tone="auto" gradient label="Auto positive" />
          <Sparkline data={[7, 6, 5, 5, 4, 3, 2, 2]} tone="auto" gradient label="Auto negative" />
          <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} stroke="var(--chart-4)" label="Custom token" />
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Coach client roster"
        description="Weekly session counts per client at a glance: streak, trend shape and delta in one row each."
      >
        <div className="divide-y divide-border">
          {CLIENTS.map((client) => (
            <div key={client.name} className="flex items-center gap-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                {client.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{client.name}</p>
                <p className="truncate text-xs text-muted-foreground">{client.plan}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Flame aria-hidden className="size-3.5 text-warning" />
                {client.streak}d
              </span>
              <Sparkline
                data={client.data}
                tone="auto"
                gradient
                label={`${client.name} session trend`}
              />
              <span
                className={cn(
                  "w-12 text-right text-xs font-medium tabular-nums",
                  client.delta.startsWith("-") ? "text-destructive" : "text-success",
                )}
              >
                {client.delta}
              </span>
            </div>
          ))}
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Sparkline } from "@pinchblock/ui"

// Default stroke is the chart-1 token.
<Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} label="Session trend" />

// tone="auto": chart-positive when rising, chart-negative when falling.
<Sparkline data={weeklySessions} tone="auto" gradient label="Mari K. session trend" />

// Custom color: a chart token, never a raw value.
<Sparkline data={volume} stroke="var(--chart-4)" label="Volume trend" />
`}
      />
    </div>
  )
}
