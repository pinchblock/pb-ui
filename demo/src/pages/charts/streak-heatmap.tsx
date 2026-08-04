import { Flame } from "@phosphor-icons/react"

import { StreakHeatmap } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"
import { STREAK_DAYS } from "./data.ts"

export default function StreakHeatmapPage() {
  return (
    <div>
      <PageIntro
        title="StreakHeatmap"
        description="A GitHub-style consistency grid, Monday-first. Intensity steps are color-mix percentages of one chart token; empty days sit on chart-track, so every theme recolors it for free."
        use="Use for training consistency on profiles and weekly reports. It rewards showing up, not volume, so feed it session counts, not kilograms. For a single week use plain markup; the grid earns its space from about 8 weeks up."
      />

      <Showcase
        title="20 weeks of training consistency"
        hint="Hover a cell for the day and value. The legend swatches use the same color-mix steps of chart-1 the cells use."
      >
        <div className="overflow-x-auto pb-1">
          <StreakHeatmap
            data={STREAK_DAYS}
            weeks={20}
            valueLabel={(v) => (v === 1 ? "1 session" : `${v} sessions`)}
          />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-faint-foreground">
          Less
          <span className="size-3 rounded-xs" style={{ background: "var(--chart-track)" }} />
          <span
            className="size-3 rounded-xs"
            style={{ background: "color-mix(in oklab, var(--chart-1) 30%, transparent)" }}
          />
          <span
            className="size-3 rounded-xs"
            style={{ background: "color-mix(in oklab, var(--chart-1) 65%, transparent)" }}
          />
          <span className="size-3 rounded-xs" style={{ background: "var(--chart-1)" }} />
          More
        </div>
      </Showcase>

      <Showcase title="Compact, no labels" hint="For tight card layouts: weeks=12, labels off, any chart token as color.">
        <StreakHeatmap
          data={STREAK_DAYS}
          weeks={12}
          showMonthLabels={false}
          showDayLabels={false}
          color="var(--chart-2)"
        />
      </Showcase>

      <ExampleBlock
        title="Profile consistency"
        description="Athlete profile: the streak number is the hook, the grid is the proof."
      >
        <div className="max-w-xl rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-card-foreground">Katrin V.</p>
              <p className="text-xs text-muted-foreground">Strength base, week 9</p>
            </div>
            <p className="flex items-center gap-1 text-sm font-semibold text-foreground tabular-nums">
              <Flame aria-hidden className="size-4 text-warning" /> 21 day streak
            </p>
          </div>
          <div className="overflow-x-auto pb-1">
            <StreakHeatmap
              data={STREAK_DAYS}
              weeks={16}
              showDayLabels={false}
              valueLabel={(v) => (v === 1 ? "1 session" : `${v} sessions`)}
            />
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { StreakHeatmap, type StreakDay } from "@pinchblock/ui"

const days: StreakDay[] = sessions.map((s) => ({
  date: s.date,
  value: s.count, // 0..n; intensity clamps at 3+
}))

<StreakHeatmap
  data={days}
  weeks={20}
  valueLabel={(v) => (v === 1 ? "1 session" : \`\${v} sessions\`)}
/>

// Compact card variant; color is a chart token, cells derive their
// intensity steps from it via color-mix, empty days use chart-track.
<StreakHeatmap data={days} weeks={12} showMonthLabels={false} showDayLabels={false} color="var(--chart-2)" />
`}
      />
    </div>
  )
}
