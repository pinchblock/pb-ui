import { TrendChart, type TrendPoint } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"
import { SESSION_TREND } from "./data.ts"

const VOLUME_TREND: TrendPoint[] = [
  { label: "W1", value: 8400 },
  { label: "W2", value: 9100 },
  { label: "W3", value: 9800 },
  { label: "W4", value: 5200 },
  { label: "W5", value: 10600 },
  { label: "W6", value: 11400 },
  { label: "W7", value: 12100 },
  { label: "W8", value: 9600 },
  { label: "W9", value: 12800 },
  { label: "W10", value: 13500 },
  { label: "W11", value: 12900 },
  { label: "W12", value: 14200 },
]

export default function TrendChartPage() {
  return (
    <div>
      <PageIntro
        title="TrendChart"
        description="A single-metric line chart with optional target line and feel-tinted dots. Built on the Chart kit, preconfigured for the one chart Pinchblock draws most: a value over time."
        use="Use for session load, volume or any one metric per athlete. Dots tint by the 1-5 feel rating (feel-1..5 tokens) when the data carries one. For multi-series comparisons drop down to the Chart kit; for a bare shape in a list row use Sparkline."
      />

      <Showcase
        title="Full size with feel dots and target"
        hint="Session load (RPE) over a block. Dots are tinted by the athlete's 1-5 feel rating; the dashed line is the block target (chart-target token)."
      >
        <TrendChart
          data={SESSION_TREND}
          label="Session load"
          target={8}
          valueFormatter={(v) => `${v} RPE`}
        />
      </Showcase>

      <Showcase
        title="Compact (h-24) for cards and list rows"
        hint="Same component, size='compact': no axes, tight margins."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-1 text-xs text-muted-foreground">Last 10 sessions</p>
            <TrendChart data={SESSION_TREND} size="compact" label="Load" />
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-1 text-xs text-muted-foreground">Weekly volume, no dots</p>
            <TrendChart
              data={VOLUME_TREND}
              size="compact"
              label="Volume"
              color="var(--chart-2)"
              showDots={false}
              valueFormatter={(v) => `${Number(v).toLocaleString()} kg`}
            />
          </div>
        </div>
      </Showcase>

      <ExampleBlock
        title="Block review"
        description="Coach reviewing an athlete's load against the block target before adjusting next week's plan."
      >
        <div className="max-w-xl rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-card-foreground">Mari K., session load</p>
              <p className="text-xs text-muted-foreground">Hypertrophy block, target 8 RPE</p>
            </div>
            <p className="text-xs text-muted-foreground">
              avg <span className="font-medium text-foreground tabular-nums">7.1 RPE</span>
            </p>
          </div>
          <TrendChart
            data={SESSION_TREND}
            label="Session load"
            target={8}
            valueFormatter={(v) => `${v} RPE`}
          />
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { TrendChart, type TrendPoint } from "@pinchblock/ui"

const load: TrendPoint[] = [
  { label: "May 12", value: 8.5, feel: 5 }, // feel tints the dot via feel-1..5 tokens
  { label: "May 15", value: 8.0, feel: 4 },
]

<TrendChart data={load} label="Session load" target={8} valueFormatter={(v) => \`\${v} RPE\`} />

// Compact, for cards and rows; color is always a chart token.
<TrendChart data={volume} size="compact" label="Volume" color="var(--chart-2)" showDots={false} />
`}
      />
    </div>
  )
}
