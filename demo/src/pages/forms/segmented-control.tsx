import { Barbell, Bicycle, Mountains } from "@phosphor-icons/react"
import { useState } from "react"

import { SegmentedControl, SegmentedControlItem } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

const PERIOD_STATS = {
  week: { sessions: "4 sessions", volume: "6 h 20 m on the wall" },
  month: { sessions: "17 sessions", volume: "26 h total, 2 PRs" },
  year: { sessions: "182 sessions", volume: "271 h, 14 PRs, best streak 21 days" },
} as const

type Period = keyof typeof PERIOD_STATS

export default function SegmentedControlPage() {
  const [period, setPeriod] = useState<Period>("week")
  return (
    <div>
      <PageIntro
        title="SegmentedControl"
        description="Single-select segment bar: bg-muted shell, active segment lifts on bg-card with shadow-card. Base UI ToggleGroup underneath (roving focus, arrow keys), with the always-one-selected invariant enforced: pressing the active segment keeps it."
        use="Use for 2 to 5 mutually exclusive views or modes where all options must stay visible (stats period, sign-up role, feel picker). More options or longer labels: use Select. Navigation between routes: use Tabs."
      />

      <Showcase title="Sizes" hint="md (default) and sm.">
        <VariantRow>
          <SegmentedControl defaultValue="week" aria-label="Stats period (md)">
            <SegmentedControlItem value="week">Week</SegmentedControlItem>
            <SegmentedControlItem value="month">Month</SegmentedControlItem>
            <SegmentedControlItem value="year">Year</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl size="sm" defaultValue="athlete" aria-label="Sign up as">
            <SegmentedControlItem value="athlete">Athlete</SegmentedControlItem>
            <SegmentedControlItem value="coach">Coach</SegmentedControlItem>
          </SegmentedControl>
        </VariantRow>
      </Showcase>

      <Showcase title="With icons and disabled items" hint="Icons inherit the global weight from IconContext.">
        <SegmentedControl defaultValue="climb" aria-label="Discipline">
          <SegmentedControlItem value="climb">
            <Mountains aria-hidden /> Climb
          </SegmentedControlItem>
          <SegmentedControlItem value="lift">
            <Barbell aria-hidden /> Lift
          </SegmentedControlItem>
          <SegmentedControlItem value="ride" disabled>
            <Bicycle aria-hidden /> Ride
          </SegmentedControlItem>
        </SegmentedControl>
      </Showcase>

      <ExampleBlock
        title="Stats period switcher"
        description="Card header pattern: the segmented control swaps the range, the card body follows the selection."
      >
        <div className="max-w-md space-y-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-card-foreground">Training volume</p>
            <SegmentedControl
              size="sm"
              value={period}
              onValueChange={(value) => setPeriod(value as Period)}
              aria-label="Stats period"
            >
              <SegmentedControlItem value="week">Week</SegmentedControlItem>
              <SegmentedControlItem value="month">Month</SegmentedControlItem>
              <SegmentedControlItem value="year">Year</SegmentedControlItem>
            </SegmentedControl>
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">{PERIOD_STATS[period].sessions}</p>
            <p className="text-sm text-muted-foreground">{PERIOD_STATS[period].volume}</p>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { SegmentedControl, SegmentedControlItem } from "@pinchblock/ui"

<SegmentedControl
  value={period}
  onValueChange={setPeriod}
  aria-label="Stats period"
>
  <SegmentedControlItem value="week">Week</SegmentedControlItem>
  <SegmentedControlItem value="month">Month</SegmentedControlItem>
  <SegmentedControlItem value="year">Year</SegmentedControlItem>
</SegmentedControl>
`}
      />
    </div>
  )
}
