import { Barbell, Flame, Heartbeat, PersonSimpleRun, Users } from "@phosphor-icons/react"

import { StatTile } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function StatTilePage() {
  return (
    <div>
      <PageIntro
        title="StatTile"
        description="KPI tile: eyebrow label, display value, optional icon, trend and footnote. Unifies the five hand-rolled KPI blocks pb-app grew."
        use="For dashboard headline numbers, in grids of two to four. Trend tone defaults to positive for up and negative for down; pass positive explicitly when down is good (resting HR, body fat, 5k time)."
      />

      <Showcase
        title="Anatomy and trends"
        hint="Resting HR trends down and is still green: positive is passed explicitly. Missed check-ins trends up and reads red the same way."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Weekly volume"
            value="96,400 kg"
            icon={<Barbell aria-hidden />}
            trend={{ value: "+8%", direction: "up" }}
            footnote="vs last week"
          />
          <StatTile
            label="Streak"
            value="21 days"
            icon={<Flame aria-hidden />}
            trend={{ value: "+3", direction: "up" }}
          />
          <StatTile
            label="Resting HR"
            value="52 bpm"
            icon={<Heartbeat aria-hidden />}
            trend={{ value: "-2 bpm", direction: "down", positive: true }}
            footnote="rolling 7-day average"
          />
          <StatTile label="Squad size" value="32" icon={<Users aria-hidden />} footnote="2 pending invites" />
        </div>
      </Showcase>

      <ExampleBlock
        title="Athlete week summary"
        description="Three tiles on an athlete detail page; the 5k time improves by getting smaller."
      >
        <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
          <StatTile
            label="Sessions"
            value="5 of 6"
            icon={<Barbell aria-hidden />}
            footnote="one skipped, coach approved"
          />
          <StatTile
            label="5k time"
            value="22:41"
            icon={<PersonSimpleRun aria-hidden />}
            trend={{ value: "-0:14", direction: "down", positive: true }}
            footnote="tested Saturday"
          />
          <StatTile
            label="Streak"
            value="34 days"
            icon={<Flame aria-hidden />}
            trend={{ value: "+7", direction: "up" }}
            footnote="squad best"
          />
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { StatTile } from "@pinchblock/ui"

<StatTile
  label="Weekly volume"
  value="96,400 kg"
  icon={<Barbell />}
  trend={{ value: "+8%", direction: "up" }}
  footnote="vs last week"
/>

// Down is good here; say so explicitly:
<StatTile
  label="Resting HR"
  value="52 bpm"
  trend={{ value: "-2 bpm", direction: "down", positive: true }}
/>
`}
      />
    </div>
  )
}
