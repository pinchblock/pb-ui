import { Flame } from "@phosphor-icons/react"

import { ActivityRing, Button } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function ActivityRingPage() {
  return (
    <div>
      <PageIntro
        title="ActivityRing"
        description="Concentric progress rings with an animated sweep on scroll into view. Up to three rings, outermost first; ring colors default through chart-1..3 and accept any chart token."
        use="Use for goal completion (weekly sessions, volume, recovery), one ring per goal, three max. Reduced motion jumps straight to the end value. For linear progress use Progress; for a value over time use TrendChart."
      />

      <Showcase
        title="Nested trio"
        hint="Up to three rings, outermost first. The center slot takes any content; the legend is plain markup on chart tokens."
      >
        <VariantRow>
          <ActivityRing
            size="lg"
            rings={[
              { value: 82, label: "Sessions" },
              { value: 64, label: "Volume" },
              { value: 91, label: "Recovery" },
            ]}
          >
            <span className="text-xl font-semibold text-foreground">82%</span>
            <span className="text-xs text-muted-foreground">weekly goal</span>
          </ActivityRing>
          <div className="space-y-1.5 text-sm">
            <p className="flex items-center gap-2">
              <i className="size-2.5 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Sessions</span>
              <span className="font-medium text-foreground tabular-nums">82%</span>
            </p>
            <p className="flex items-center gap-2">
              <i className="size-2.5 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">Volume</span>
              <span className="font-medium text-foreground tabular-nums">64%</span>
            </p>
            <p className="flex items-center gap-2">
              <i className="size-2.5 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Recovery</span>
              <span className="font-medium text-foreground tabular-nums">91%</span>
            </p>
          </div>
        </VariantRow>
      </Showcase>

      <Showcase
        title="Single ring sizes"
        hint="value shorthand for one ring; any chart token as color."
      >
        <VariantRow>
          <ActivityRing size="sm" value={45} aria-label="Sessions 45%" />
          <ActivityRing size="md" value={70} aria-label="Sessions 70%">
            <span className="text-sm font-semibold text-foreground">70%</span>
          </ActivityRing>
          <ActivityRing
            size="md"
            rings={[{ value: 100, label: "Streak goal", color: "var(--chart-3)" }]}
          >
            <Flame aria-hidden className="size-5 text-warning" />
          </ActivityRing>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Weekly goal card"
        description="Athlete home screen: goal ring plus the one action that closes it."
      >
        <div className="flex max-w-md items-center gap-5 rounded-xl border border-border bg-card p-4">
          <ActivityRing
            size="md"
            rings={[
              { value: 80, label: "Sessions" },
              { value: 64, label: "Volume" },
            ]}
          >
            <span className="text-sm font-semibold text-foreground">4/5</span>
          </ActivityRing>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-card-foreground">One session to go</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Friday's pull session closes your week and keeps the 12 day streak alive.
            </p>
            <Button size="sm" className="mt-3">
              Start session
            </Button>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { ActivityRing } from "@pinchblock/ui"

// Single ring shorthand.
<ActivityRing size="sm" value={45} aria-label="Sessions 45%" />

// Nested rings, outermost first; colors default through chart-1..3.
<ActivityRing
  size="lg"
  rings={[
    { value: 82, label: "Sessions" },
    { value: 64, label: "Volume" },
    { value: 91, label: "Recovery", color: "var(--chart-5)" }, // chart tokens only
  ]}
>
  <span>82%</span>
</ActivityRing>
`}
      />
    </div>
  )
}
