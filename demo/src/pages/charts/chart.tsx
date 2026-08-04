import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../src/components/charts/chart.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/* Recharts runs JS-driven entrance animations; gate them explicitly. */
const ANIMATE =
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches

const WEEKLY_SESSIONS = [
  { week: "W1", you: 3, squad: 4 },
  { week: "W2", you: 4, squad: 4 },
  { week: "W3", you: 4, squad: 5 },
  { week: "W4", you: 2, squad: 4 },
  { week: "W5", you: 5, squad: 4 },
  { week: "W6", you: 5, squad: 5 },
  { week: "W7", you: 6, squad: 5 },
  { week: "W8", you: 4, squad: 4 },
  { week: "W9", you: 6, squad: 5 },
  { week: "W10", you: 7, squad: 5 },
  { week: "W11", you: 6, squad: 5 },
  { week: "W12", you: 7, squad: 6 },
]

const WEEKLY_VOLUME = [
  { week: "W1", volume: 8400 },
  { week: "W2", volume: 9100 },
  { week: "W3", volume: 9800 },
  { week: "W4", volume: 5200 },
  { week: "W5", volume: 10600 },
  { week: "W6", volume: 11400 },
  { week: "W7", volume: 12100 },
  { week: "W8", volume: 9600 },
  { week: "W9", volume: 12800 },
  { week: "W10", volume: 13500 },
  { week: "W11", volume: 12900 },
  { week: "W12", volume: 14200 },
]

const TRAINING_SPLIT = [
  { week: "W1", strength: 120, conditioning: 45 },
  { week: "W2", strength: 140, conditioning: 60 },
  { week: "W3", strength: 150, conditioning: 55 },
  { week: "W4", strength: 80, conditioning: 30 },
  { week: "W5", strength: 160, conditioning: 70 },
  { week: "W6", strength: 170, conditioning: 65 },
  { week: "W7", strength: 180, conditioning: 80 },
  { week: "W8", strength: 140, conditioning: 60 },
  { week: "W9", strength: 190, conditioning: 85 },
  { week: "W10", strength: 200, conditioning: 90 },
  { week: "W11", strength: 185, conditioning: 80 },
  { week: "W12", strength: 210, conditioning: 95 },
]

export default function ChartPage() {
  return (
    <div>
      <PageIntro
        title="Chart"
        description="The recharts wrapper kit: ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend and ChartLegendContent. A config object maps each series key to a label and a chart token, exposed to recharts as var(--color-key); axes, grid and cursor pick up semantic tokens automatically."
        use="Reach for this for any full chart (line, bar, area). For a tiny line in a list row use Sparkline; for a single-metric line with a target use TrendChart. Colors come from config, defaulting through chart-1..8; never pass a raw color to a recharts prop."
      />

      <Showcase
        title="Line chart with config"
        hint="Config keys become var(--color-key) on the container. Tooltip and legend read labels from the same config."
      >
        <ChartContainer
          config={{
            you: { label: "You" },
            squad: { label: "Squad avg", color: "var(--chart-2)" },
          }}
        >
          <LineChart data={WEEKLY_SESSIONS} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis width={28} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="you"
              type="monotone"
              stroke="var(--color-you)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={ANIMATE}
            />
            <Line
              dataKey="squad"
              type="monotone"
              stroke="var(--color-squad)"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              isAnimationActive={ANIMATE}
            />
          </LineChart>
        </ChartContainer>
      </Showcase>

      <Showcase title="Stacked area" hint="Strength vs conditioning minutes per week.">
        <ChartContainer
          config={{
            strength: { label: "Strength" },
            conditioning: { label: "Conditioning", color: "var(--chart-2)" },
          }}
        >
          <AreaChart data={TRAINING_SPLIT} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent valueFormatter={(v) => `${v} min`} />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="strength"
              stackId="split"
              type="monotone"
              stroke="var(--color-strength)"
              fill="var(--color-strength)"
              fillOpacity={0.3}
              isAnimationActive={ANIMATE}
            />
            <Area
              dataKey="conditioning"
              stackId="split"
              type="monotone"
              stroke="var(--color-conditioning)"
              fill="var(--color-conditioning)"
              fillOpacity={0.3}
              isAnimationActive={ANIMATE}
            />
          </AreaChart>
        </ChartContainer>
      </Showcase>

      <ExampleBlock
        title="Weekly volume card"
        description="Single series bar chart on a progress card. One series needs no legend; the card header names it."
      >
        <div className="max-w-xl rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <p className="text-sm font-medium text-card-foreground">Training volume, this block</p>
            <p className="text-xs text-success">+18% vs last block</p>
          </div>
          <ChartContainer config={{ volume: { label: "Volume (kg)" } }}>
            <BarChart data={WEEKLY_VOLUME} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                content={
                  <ChartTooltipContent valueFormatter={(v) => `${Number(v).toLocaleString()} kg`} />
                }
              />
              <Bar
                dataKey="volume"
                fill="var(--color-volume)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={ANIMATE}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent,
} from "@pinchblock/ui"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

<ChartContainer
  config={{
    you: { label: "You" },                                  // defaults to var(--chart-1)
    squad: { label: "Squad avg", color: "var(--chart-2)" }, // always a chart token
  }}
>
  <LineChart data={weeks}>
    <CartesianGrid vertical={false} strokeDasharray="3 3" />
    <XAxis dataKey="week" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    {/* recharts props reference config vars, never raw colors */}
    <Line dataKey="you" stroke="var(--color-you)" strokeWidth={2} dot={false} />
    <Line dataKey="squad" stroke="var(--color-squad)" strokeDasharray="6 3" dot={false} />
  </LineChart>
</ChartContainer>
`}
      />
    </div>
  )
}
