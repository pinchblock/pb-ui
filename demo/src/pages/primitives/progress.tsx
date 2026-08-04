import { Flame } from "@phosphor-icons/react"

import { Badge } from "../../../../src/components/ui/badge.tsx"
import { Progress } from "../../../../src/components/ui/progress.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function ProgressPage() {
  return (
    <div>
      <PageIntro
        title="Progress"
        description="Determinate and indeterminate progress bar. Base UI Progress underneath: aria-valuenow and the accessible label wiring come free."
        use="Goal and completion tracking: weekly sessions, block progress, upload state. Pass value={null} (the default) only while real progress is unknown; switch to a number as soon as you have one."
      />

      <Showcase title="Sizes and value display" hint="sm and md heights; label and value slots are optional.">
        <div className="max-w-sm space-y-6">
          <Progress size="sm" value={30} aria-label="Warm-up progress" />
          <Progress size="md" value={65} aria-label="Session progress" />
          <Progress value={65} label="Training block" showValue />
          <Progress value={100} label="Base phase" showValue />
        </div>
      </Showcase>

      <Showcase
        title="Indeterminate"
        hint="value={null} (the default) sweeps until real progress is known. Reduced motion parks it as a static partial bar."
      >
        <div className="max-w-sm">
          <Progress size="sm" label="Syncing with watch" />
        </div>
      </Showcase>

      <ExampleBlock
        title="Weekly goal"
        description="Session count against the plan, with a streak badge when the athlete is on pace."
      >
        <div className="max-w-md rounded-xl border border-border bg-card p-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground">Weekly sessions</p>
            <span className="text-xs text-muted-foreground tabular-nums">3 of 4</span>
          </div>
          <Progress size="sm" value={3} max={4} aria-label="Weekly sessions completed" />
          <div className="mt-3 flex items-center gap-2">
            <Badge tone="primary" icon={<Flame />}>
              12-week streak
            </Badge>
            <span className="text-xs text-muted-foreground">One session left to keep it alive.</span>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Progress } from "@pinchblock/ui"

<Progress value={3} max={4} aria-label="Weekly sessions completed" />
<Progress value={65} label="Training block" showValue />

// Indeterminate while waiting for real numbers:
<Progress label="Syncing with watch" />
`}
      />
    </div>
  )
}
