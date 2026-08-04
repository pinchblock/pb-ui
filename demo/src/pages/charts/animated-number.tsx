import { Trophy } from "@phosphor-icons/react"
import { useState } from "react"

import {
  AnimatedNumber,
  AnimatedNumberGroup,
} from "../../../../src/components/charts/animated-number.tsx"
import { Button } from "../../../../src/components/ui/button.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

function StatCounters() {
  const [sessions, setSessions] = useState(148)
  const [volume, setVolume] = useState(12480)
  const [prs, setPrs] = useState(3)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">Sessions logged</p>
          <AnimatedNumber value={sessions} className="text-2xl font-semibold text-foreground" />
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">Volume this block</p>
          <AnimatedNumber
            value={volume}
            suffix=" kg"
            className="text-2xl font-semibold text-foreground"
          />
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Trophy aria-hidden className="size-3.5 text-warning" /> PRs this block
          </p>
          <AnimatedNumber value={prs} className="text-2xl font-semibold text-foreground" />
        </div>
      </div>
      <VariantRow>
        <Button
          onClick={() => {
            setSessions((n) => n + 1)
            setVolume((n) => n + 320)
          }}
        >
          Log session
        </Button>
        <Button variant="soft" onClick={() => setPrs((n) => n + 1)}>
          New PR
        </Button>
        <p className="text-xs text-muted-foreground">
          Digits roll to the new value; tabular numerals keep layout from shifting.
        </p>
      </VariantRow>
    </div>
  )
}

function GroupedGoal() {
  const [done, setDone] = useState(12)
  return (
    <div className="space-y-3">
      <AnimatedNumberGroup>
        <span className="text-2xl font-semibold text-foreground">
          <AnimatedNumber value={done} />
          <span className="text-muted-foreground"> / </span>
          <AnimatedNumber value={16} />
        </span>
      </AnimatedNumberGroup>
      <VariantRow>
        <Button variant="secondary" size="sm" onClick={() => setDone((n) => (n + 1) % 17)}>
          Complete session
        </Button>
        <p className="text-xs text-muted-foreground">
          Numbers inside a group animate on one shared clock; both tick together.
        </p>
      </VariantRow>
    </div>
  )
}

function SetLogger() {
  const [volume, setVolume] = useState(3240)
  const [sets, setSets] = useState(3)
  return (
    <div className="flex max-w-md items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
      <div>
        <p className="text-sm font-medium text-card-foreground">Back squat</p>
        <p className="text-xs text-muted-foreground">
          Set {Math.min(sets + 1, 6)} of 6, 120 kg x 9
        </p>
        <AnimatedNumber
          value={volume}
          suffix=" kg total"
          className="mt-1 text-xl font-semibold text-foreground"
        />
      </div>
      <Button
        onClick={() => {
          setSets((n) => Math.min(n + 1, 6))
          setVolume((n) => n + 1080)
        }}
        disabled={sets >= 6}
      >
        Log set
      </Button>
    </div>
  )
}

export default function AnimatedNumberPage() {
  return (
    <div>
      <PageIntro
        title="AnimatedNumber"
        description="Rolling-digit numbers via @number-flow/react: tabular numerals by default, so the layout never shifts while digits move. AnimatedNumberGroup syncs several numbers onto one clock."
        use="Use wherever a stat changes while the athlete watches: session counters, volume totals, streaks. Respect the reward hierarchy: the roll is the celebration, do not add a second animation on top. Static stats need plain text, not this."
      />

      <Showcase
        title="Stat counters"
        hint="Press the buttons: digits roll to the new value."
      >
        <StatCounters />
      </Showcase>

      <Showcase
        title="Grouped: both tick together"
        hint="AnimatedNumberGroup keeps a fraction like 12/16 in lockstep when both sides change."
      >
        <GroupedGoal />
      </Showcase>

      <ExampleBlock
        title="In-session volume counter"
        description="Logging sets mid-session: total volume rolls up with every set, the number is the reward."
      >
        <SetLogger />
      </ExampleBlock>

      <CodeBlock
        code={`
import { AnimatedNumber, AnimatedNumberGroup } from "@pinchblock/ui"

<AnimatedNumber value={volume} suffix=" kg" className="text-2xl font-semibold text-foreground" />

// Fractions tick in lockstep inside a group:
<AnimatedNumberGroup>
  <AnimatedNumber value={done} /> / <AnimatedNumber value={goal} />
</AnimatedNumberGroup>
`}
      />
    </div>
  )
}
