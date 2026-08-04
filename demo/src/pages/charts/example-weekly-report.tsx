import { Flame } from "@phosphor-icons/react"

import { ActivityRing } from "../../../../src/components/charts/activity-ring.tsx"
import { StreakHeatmap } from "../../../../src/components/charts/streak-heatmap.tsx"
import { TrendChart } from "../../../../src/components/charts/trend-chart.tsx"
import { FeelBadge, FeelDot } from "../../../../src/components/rating-feel.tsx"
import { CodeBlock, ExampleBlock, PageIntro } from "../../sink/showcase.tsx"
import { SESSION_TREND, STREAK_DAYS } from "./data.ts"

export default function WeeklyReportExamplePage() {
  return (
    <div>
      <PageIntro
        title="Example: weekly report"
        description="A composed cross-component demo: ActivityRing, TrendChart, StreakHeatmap, FeelBadge and FeelDot on one card, the way a Pinchblock coach reviews a client's week."
        use="Copy the composition, not the card: every block here is a system component on semantic tokens, so the whole report restyles with the theme. If a report needs a chart this page does not show, it belongs on that component's own page first."
      />

      <ExampleBlock
        title="Client weekly report"
        description="Rings for goals, trend for load, heatmap for consistency, feel for the athlete's own read."
      >
        <div className="max-w-2xl rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-foreground">Mari K.</p>
              <p className="text-sm text-muted-foreground">Hypertrophy block, week 6 of 8</p>
            </div>
            <FeelBadge feel={4}>Mostly good week</FeelBadge>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-6">
            <ActivityRing
              size="md"
              rings={[
                { value: 100, label: "Sessions" },
                { value: 78, label: "Volume" },
                { value: 62, label: "Recovery" },
              ]}
            >
              <span className="text-sm font-semibold text-foreground">5/5</span>
            </ActivityRing>
            <div className="grid flex-1 grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="text-lg font-semibold text-foreground tabular-nums">14.2t</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="flex items-center gap-1 text-lg font-semibold text-foreground tabular-nums">
                  <Flame aria-hidden className="size-4 text-warning" /> 12d
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg feel</p>
                <p className="flex items-center gap-1.5 text-lg font-semibold text-foreground tabular-nums">
                  <FeelDot feel={4} size="sm" /> 4.2
                </p>
              </div>
            </div>
          </div>
          <p className="mb-1 text-xs text-muted-foreground">Session load, last 10</p>
          <TrendChart data={SESSION_TREND} size="compact" label="Load" target={8} />
          <p className="mt-4 mb-1 text-xs text-muted-foreground">Consistency, last 12 weeks</p>
          <div className="overflow-x-auto pb-1">
            <StreakHeatmap data={STREAK_DAYS} weeks={12} showMonthLabels={false} />
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        title="Composition"
        code={`
import { ActivityRing, FeelBadge, FeelDot, StreakHeatmap, TrendChart } from "@pinchblock/ui"

// Every block is a system component; the report card is just layout.
<ActivityRing size="md" rings={[{ value: 100, label: "Sessions" }, ...]} />
<TrendChart data={sessionLoad} size="compact" label="Load" target={8} />
<StreakHeatmap data={days} weeks={12} showMonthLabels={false} />
<FeelBadge feel={4}>Mostly good week</FeelBadge>
`}
      />
    </div>
  )
}
